
import { useState, useEffect } from "react";
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
import { useAuth } from '@/components/AuthProvider';

interface Document {
  id: string;
  title: string;
  file_name: string;
  file_url: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

const DocumentUpload = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);

  const requiredDocuments = [
    {
      id: "passport",
      name: "Passaporto o Carta d'Identità",
      description: "Documento di identità rilasciato dal governo",
      required: true
    },
    {
      id: "address_proof", 
      name: "Prova di Residenza",
      description: "Bolletta o estratto conto bancario (max 3 mesi)",
      required: true
    },
    {
      id: "source_of_funds",
      name: "Fonte dei Fondi",
      description: "Estratti conto o verifica del reddito",
      required: true
    },
    {
      id: "tax_document",
      name: "Documentazione Fiscale", 
      description: "Certificato di residenza fiscale o equivalente",
      required: false
    }
  ];

  useEffect(() => {
    loadDocuments();
  }, [user]);

  const loadDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading documents:', error);
        return;
      }
      
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleFileUpload = async (documentType: string, file: File) => {
    if (!file || !user) return;

    setLoading(true);
    setUploadProgress(prev => ({ ...prev, [documentType]: 0 }));

    try {
      // Simula upload con progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(prev => ({ ...prev, [documentType]: i }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Crea un URL fittizio per il file (in produzione useresti Supabase Storage)
      const fileUrl = `https://example.com/documents/${user.id}/${documentType}_${Date.now()}_${file.name}`;

      // Salva nel database
      const { error } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          title: requiredDocuments.find(d => d.id === documentType)?.name || documentType,
          description: `Documento di tipo: ${documentType}`,
          file_name: file.name,
          file_url: fileUrl,
          file_type: file.type,
          file_size: file.size,
          status: 'PENDING'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Documento Caricato",
        description: "Il tuo documento è stato inviato per la revisione.",
      });

      // Aggiorna la lista dei documenti
      loadDocuments();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Caricamento Fallito",
        description: "Impossibile caricare il documento. Riprova.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setUploadProgress(prev => ({ ...prev, [documentType]: 0 }));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "REJECTED":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800 text-xs">Approvato</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">In Revisione</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800 text-xs">Rifiutato</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Non Caricato</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Gestione Documenti</h1>
        <p className="text-sm text-gray-600 mt-1">Carica e gestisci i tuoi documenti di verifica KYC</p>
      </div>

      <div className="grid gap-6">
        {requiredDocuments.map((docType) => {
          const uploadedDoc = documents.find(d => d.title === docType.name);
          
          return (
            <Card key={docType.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(uploadedDoc?.status || 'not_uploaded')}
                    <div>
                      <CardTitle className="text-base flex items-center space-x-2">
                        <span>{docType.name}</span>
                        {docType.required && <Badge variant="outline" className="text-xs">Richiesto</Badge>}
                      </CardTitle>
                      <CardDescription className="text-sm">{docType.description}</CardDescription>
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
                          <Label htmlFor={`file-${docType.id}`} className="text-sm">Carica Documento</Label>
                          <Input
                            id={`file-${docType.id}`}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(docType.id, file);
                            }}
                            className="mt-1 text-sm"
                            disabled={loading}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={loading}
                            className="text-sm"
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.capture = 'environment';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) handleFileUpload(docType.id, file);
                              };
                              input.click();
                            }}
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Scatta Foto
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={loading}
                            className="text-sm"
                            onClick={() => {
                              document.getElementById(`file-${docType.id}`)?.click();
                            }}
                          >
                            <File className="mr-2 h-4 w-4" />
                            Sfoglia File
                          </Button>
                        </div>
                      </div>

                      {uploadProgress[docType.id] !== undefined && uploadProgress[docType.id] < 100 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Caricamento...</span>
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
                          <p className="text-sm font-medium">{uploadedDoc.file_name}</p>
                          <p className="text-xs text-gray-500">
                            Caricato il {new Date(uploadedDoc.created_at).toLocaleDateString()}
                          </p>
                          {uploadedDoc.admin_notes && (
                            <p className="text-xs text-red-600 mt-1">
                              <strong>Nota:</strong> {uploadedDoc.admin_notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-sm"
                          onClick={() => window.open(uploadedDoc.file_url, '_blank')}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizza
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-sm"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = uploadedDoc.file_url;
                            link.download = uploadedDoc.file_name;
                            link.click();
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Scarica
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
