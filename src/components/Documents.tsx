
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

const Documents = () => {
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  const requiredDocuments = [
    {
      id: "passport",
      name: "Passport or ID Card",
      description: "Government-issued photo identification",
      status: "completed",
      uploadDate: "2024-01-10",
      required: true
    },
    {
      id: "address",
      name: "Proof of Address",
      description: "Utility bill or bank statement (max 3 months old)",
      status: "completed",
      uploadDate: "2024-01-12",
      required: true
    },
    {
      id: "funds",
      name: "Source of Funds",
      description: "Bank statements or income verification",
      status: "pending",
      uploadDate: null,
      required: true
    },
    {
      id: "tax",
      name: "Tax Documentation",
      description: "Tax residency certificate or equivalent",
      status: "not_uploaded",
      uploadDate: null,
      required: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
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
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Uploaded</Badge>;
    }
  };

  const handleFileUpload = (documentId: string, file: File) => {
    if (!file) return;

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[documentId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          toast({
            title: "Document Uploaded",
            description: "Your document has been submitted for review.",
          });
          return { ...prev, [documentId]: 100 };
        }
        return { ...prev, [documentId]: currentProgress + 10 };
      });
    }, 200);
  };

  const completedDocs = requiredDocuments.filter(doc => doc.status === "completed").length;
  const totalRequired = requiredDocuments.filter(doc => doc.required).length;
  const completionPercentage = (completedDocs / totalRequired) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <p className="text-gray-600 mt-1">Upload and manage your KYC verification documents</p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            KYC Verification Progress
            <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
              {completedDocs}/{totalRequired} Complete
            </Badge>
          </CardTitle>
          <CardDescription>
            Complete your document verification to unlock all platform features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
          {completionPercentage === 100 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Verification Complete!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                All required documents have been submitted and verified.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document List */}
      <div className="grid gap-6">
        {requiredDocuments.map((doc) => (
          <Card key={doc.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{doc.name}</span>
                      {doc.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                    </CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doc.status === "not_uploaded" || doc.status === "rejected" ? (
                  <div>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`file-${doc.id}`}>Upload Document</Label>
                        <Input
                          id={`file-${doc.id}`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          }}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Camera className="mr-2 h-4 w-4" />
                          Take Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <File className="mr-2 h-4 w-4" />
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    {uploadProgress[doc.id] !== undefined && uploadProgress[doc.id] < 100 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress[doc.id]}%</span>
                        </div>
                        <Progress value={uploadProgress[doc.id]} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Document uploaded</p>
                        {doc.uploadDate && (
                          <p className="text-sm text-gray-500">Uploaded on {doc.uploadDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {doc.status === "rejected" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-800 font-medium">Document Rejected</span>
                    </div>
                    <p className="text-red-700 text-sm">
                      Please upload a clearer image or ensure all information is visible and legible.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
          <CardDescription>Follow these guidelines for faster verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Document Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clear, high-resolution images</li>
                <li>• All text must be legible</li>
                <li>• No shadows or glare</li>
                <li>• Document must be valid and current</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PDF files (recommended)</li>
                <li>• JPEG/JPG images</li>
                <li>• PNG images</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
