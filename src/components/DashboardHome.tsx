
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, FileText, Shield, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHomeProps {
  onTabChange: (tab: string) => void;
}

const DashboardHome = ({ onTabChange }: DashboardHomeProps) => {
  const navigate = useNavigate();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'portfolio':
        onTabChange('portfolio');
        break;
      case 'documents':
        onTabChange('documents');
        break;
      case 'support':
        onTabChange('support');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Valore Totale Portfolio</CardTitle>
            <TrendingUp className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">€245,678</div>
            <p className="text-xs text-muted-foreground">+12.5% dal mese scorso</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Investimenti Attivi</CardTitle>
            <Shield className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 nuovi questo mese</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Documenti</CardTitle>
            <FileText className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">15</div>
            <p className="text-xs text-muted-foreground">3 in attesa di revisione</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Messaggi</CardTitle>
            <MessageSquare className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 non letto</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attività Recente</CardTitle>
            <CardDescription className="text-sm">Le tue ultime attività di investimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Allocazione Bitcoin aumentata</p>
                  <p className="text-xs text-muted-foreground">2 ore fa</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Acquisto STRF ETF completato</p>
                  <p className="text-xs text-muted-foreground">1 giorno fa</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Ribilanciamento portfolio iniziato</p>
                  <p className="text-xs text-muted-foreground">3 giorni fa</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Azioni Rapide</CardTitle>
            <CardDescription className="text-sm">Gestisci i tuoi investimenti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickAction('portfolio')}
                className="w-full text-left px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Visualizza Performance Portfolio
              </button>
              <button 
                onClick={() => handleQuickAction('documents')}
                className="w-full text-left px-4 py-2 text-sm bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                Carica Documenti
              </button>
              <button 
                onClick={() => handleQuickAction('support')}
                className="w-full text-left px-4 py-2 text-sm bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                Contatta Supporto
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
