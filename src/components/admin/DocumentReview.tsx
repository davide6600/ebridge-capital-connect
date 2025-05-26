
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  User,
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DocumentReview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: "DOC-001",
      clientId: "CL-001",
      clientName: "Marco Rossi",
      type: "Passport",
      fileName: "passport_marco_rossi.pdf",
      uploadDate: "2024-01-10",
      status: "approved",
      reviewDate: "2024-01-11",
      reviewer: "Admin",
      size: "2.3 MB"
    },
    {
      id: "DOC-002",
      clientId: "CL-001",
      clientName: "Marco Rossi",
      type: "Proof of Address",
      fileName: "utility_bill_jan_2024.pdf",
      uploadDate: "2024-01-10",
      status: "approved",
      reviewDate: "2024-01-11",
      reviewer: "Admin",
      size: "1.8 MB"
    },
    {
      id: "DOC-003",
      clientId: "CL-002",
      clientName: "Anna Korhonen",
      type: "Passport",
      fileName: "id_card_anna.jpg",
      uploadDate: "2024-01-12",
      status: "pending",
      reviewDate: null,
      reviewer: null,
      size: "3.1 MB"
    },
    {
      id: "DOC-004",
      clientId: "CL-002",
      clientName: "Anna Korhonen",
      type: "Source of Funds",
      fileName: "bank_statement_2024.pdf",
      uploadDate: "2024-01-13",
      status: "pending",
      reviewDate: null,
      reviewer: null,
      size: "4.2 MB"
    },
    {
      id: "DOC-005",
      clientId: "CL-004",
      clientName: "Sophie Dubois",
      type: "Passport",
      fileName: "passport_sophie.jpg",
      uploadDate: "2024-01-08",
      status: "rejected",
      reviewDate: "2024-01-09",
      reviewer: "Admin",
      size: "1.2 MB",
      rejectionReason: "Image quality too low - text not legible"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleApprove = (docId: string) => {
    toast({
      title: "Document Approved",
      description: "The document has been approved and the client has been notified.",
    });
  };

  const handleReject = (docId: string) => {
    toast({
      title: "Document Rejected",
      description: "The document has been rejected and the client has been notified to resubmit.",
    });
  };

  const filteredDocuments = documents.filter(doc =>
    doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = documents.filter(d => d.status === "pending").length;
  const approvedCount = documents.filter(d => d.status === "approved").length;
  const rejectedCount = documents.filter(d => d.status === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Review</h1>
        <p className="text-gray-600 mt-1">Review and approve client KYC documents</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-yellow-600">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-green-600">
              This week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-red-600">
              Needs resubmission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2</div>
            <p className="text-xs text-muted-foreground">
              Days per document
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Document Queue</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents by client, type, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {doc.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(doc.status)}
                        <h3 className="font-semibold">{doc.type}</h3>
                        {getStatusBadge(doc.status)}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Client:</strong> {doc.clientName}</p>
                        <p><strong>File:</strong> {doc.fileName} ({doc.size})</p>
                        <p><strong>Uploaded:</strong> {doc.uploadDate}</p>
                        {doc.reviewDate && (
                          <p><strong>Reviewed:</strong> {doc.reviewDate} by {doc.reviewer}</p>
                        )}
                        {doc.rejectionReason && (
                          <div className="flex items-start space-x-2 mt-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <p className="text-red-600"><strong>Rejection Reason:</strong> {doc.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DocumentViewDialog document={doc} />
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>

                    {doc.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(doc.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-200 text-red-700 hover:bg-red-50"
                          onClick={() => handleReject(doc.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DocumentViewDialog = ({ document }: { document: any }) => {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Document Review: {document.type}</DialogTitle>
        <DialogDescription>
          Review document for {document.clientName}
        </DialogDescription>
      </DialogHeader>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Document Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Document ID</span>
              <p className="font-medium">{document.id}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Type</span>
              <p className="font-medium">{document.type}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">File Name</span>
              <p className="font-medium">{document.fileName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">File Size</span>
              <p className="font-medium">{document.size}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Upload Date</span>
              <p className="font-medium">{document.uploadDate}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Status</span>
              <div className="mt-1">
                {document.status === "approved" ? (
                  <Badge className="bg-green-100 text-green-800">Approved</Badge>
                ) : document.status === "pending" ? (
                  <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {document.clientName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{document.clientName}</p>
                <p className="text-sm text-gray-500">Client ID: {document.clientId}</p>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">KYC Progress</span>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Documents uploaded</span>
                  <span>3/3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Document Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Document preview would appear here</p>
            <div className="flex justify-center space-x-3">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Full Screen View
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Original
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Actions */}
      {document.status === "pending" && (
        <div className="flex space-x-3">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Document
          </Button>
          <Button variant="outline" className="flex-1 border-red-200 text-red-700 hover:bg-red-50">
            <XCircle className="mr-2 h-4 w-4" />
            Reject Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentReview;
