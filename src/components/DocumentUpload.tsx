
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Camera,
  File,
  Download,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  status: string;
  upload_date: string;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);

  const requiredDocuments = [
    {
      id: "passport",
      name: "Passport or ID Card",
      description: "Government-issued photo identification",
      required: true
    },
    {
      id: "address_proof", 
      name: "Proof of Address",
      description: "Utility bill or bank statement (max 3 months old)",
      required: true
    },
    {
      id: "source_of_funds",
      name: "Source of Funds",
      description: "Bank statements or income verification",
      required: true
    },
    {
      id: "tax_document",
      name: "Tax Documentation", 
      description: "Tax residency certificate or equivalent",
      required: false
    }
  ];

  const handleFileUpload = async (documentType: string, file: File) => {
    if (!file) return;

    setLoading(true);
    setUploadProgress(prev => ({ ...prev, [documentType]: 0 }));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to upload documents.",
          variant: "destructive"
        });
        return;
      }

      // Upload file to storage
      const fileName = `${user.id}/${documentType}_${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('client-documents')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('client-documents')
        .getPublicUrl(fileName);

      // Save document record to database
      const { error: dbError } = await supabase
        .from('client_documents')
        .insert({
          user_id: user.id,
          document_type: documentType,
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_size: file.size,
          mime_type: file.type
        });

      if (dbError) {
        throw dbError;
      }

      setUploadProgress(prev => ({ ...prev, [documentType]: 100 }));
      
      toast({
        title: "Document Uploaded",
        description: "Your document has been submitted for review.",
      });

      // Refresh documents list
      loadDocuments();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDocuments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('client_documents')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Uploaded</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <p className="text-gray-600 mt-1">Upload and manage your KYC verification documents</p>
      </div>

      <div className="grid gap-6">
        {requiredDocuments.map((docType) => {
          const uploadedDoc = documents.find(d => d.document_type === docType.id);
          
          return (
            <Card key={docType.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(uploadedDoc?.status || 'not_uploaded')}
                    <div>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{docType.name}</span>
                        {docType.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                      </CardTitle>
                      <CardDescription>{docType.description}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(uploadedDoc?.status || 'not_uploaded')}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!uploadedDoc ? (
                    <div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`file-${docType.id}`}>Upload Document</Label>
                          <Input
                            id={`file-${docType.id}`}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(docType.id, file);
                            }}
                            className="mt-1"
                            disabled={loading}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" disabled={loading}>
                            <Camera className="mr-2 h-4 w-4" />
                            Take Photo
                          </Button>
                          <Button variant="outline" size="sm" disabled={loading}>
                            <File className="mr-2 h-4 w-4" />
                            Browse Files
                          </Button>
                        </div>
                      </div>

                      {uploadProgress[docType.id] !== undefined && uploadProgress[docType.id] < 100 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Uploading...</span>
                            <span>{uploadProgress[docType.id]}%</span>
                          </div>
                          <Progress value={uploadProgress[docType.id]} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{uploadedDoc.file_name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded on {new Date(uploadedDoc.upload_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(uploadedDoc.file_url, '_blank')}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = uploadedDoc.file_url;
                            link.download = uploadedDoc.file_name;
                            link.click();
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentUpload;
