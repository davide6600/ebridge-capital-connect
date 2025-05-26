
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  User,
  Bot
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Support = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      content: "Hello! Welcome to E-Bridge Capital support. How can I assist you today?",
      timestamp: "2024-01-15 09:00",
      read: true
    },
    {
      id: 2,
      sender: "client",
      content: "Hi, I have a question about my recent Bitcoin purchase proposal.",
      timestamp: "2024-01-15 09:15",
      read: true
    },
    {
      id: 3,
      sender: "support",
      content: "I'd be happy to help you with your Bitcoin proposal. Can you please provide the proposal ID?",
      timestamp: "2024-01-15 09:17",
      read: true
    },
    {
      id: 4,
      sender: "client",
      content: "It's PROP-001. I want to understand the risk assessment better.",
      timestamp: "2024-01-15 09:20",
      read: true
    }
  ]);

  const tickets = [
    {
      id: "TICK-001",
      subject: "KYC Document Verification",
      status: "open",
      priority: "high",
      created: "2024-01-14",
      lastUpdate: "2024-01-15",
      responses: 3
    },
    {
      id: "TICK-002", 
      subject: "Portfolio Rebalancing Question",
      status: "resolved",
      priority: "medium",
      created: "2024-01-12",
      lastUpdate: "2024-01-13",
      responses: 5
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "client",
      content: message,
      timestamp: new Date().toLocaleString(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate support response
    setTimeout(() => {
      const supportResponse = {
        id: messages.length + 2,
        sender: "support",
        content: "Thank you for your message. Our team is reviewing your inquiry and will respond shortly.",
        timestamp: new Date().toLocaleString(),
        read: false
      };
      setMessages(prev => [...prev, supportResponse]);
    }, 2000);

    toast({
      title: "Message Sent",
      description: "Your message has been sent to our support team.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-600 mt-1">Get help with your investment account and services</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Live Chat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Support Online</span>
                </div>
              </CardTitle>
              <CardDescription>Chat with our investment specialists</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === 'client' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={msg.sender === 'client' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}>
                            {msg.sender === 'client' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`p-3 rounded-lg ${msg.sender === 'client' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${msg.sender === 'client' ? 'text-blue-100' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Options & Tickets */}
        <div className="space-y-6">
          {/* Contact Options */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Options</CardTitle>
              <CardDescription>Multiple ways to reach our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Call: +372 123 4567
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Email: support@ebridge.ee
              </Button>
              <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Business Hours</span>
                </div>
                <p>Monday - Friday: 9:00 - 18:00 (EET)</p>
                <p>Saturday: 10:00 - 16:00 (EET)</p>
                <p>Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>

          {/* Support Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Your Tickets</CardTitle>
              <CardDescription>Track your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{ticket.subject}</h4>
                      <div className="flex space-x-1">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>ID: {ticket.id}</p>
                      <p>Created: {ticket.created}</p>
                      <p>Responses: {ticket.responses}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Create New Ticket
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
              <CardDescription>Common questions and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  How to upload KYC documents?
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Understanding investment proposals
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Portfolio rebalancing process
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Security and data protection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
