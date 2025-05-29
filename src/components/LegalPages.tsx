
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Privacy Policy</CardTitle>
          <CardDescription>
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full">
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-semibold mb-3">1. Raccolta delle Informazioni</h3>
                <p>
                  E-Bridge Capital OÜ raccoglie informazioni necessarie per fornire i nostri servizi di investimento. 
                  Questo include dati personali come nome, email, informazioni finanziarie e di identificazione 
                  richiesti per la conformità KYC/AML.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">2. Uso delle Informazioni</h3>
                <p>
                  Utilizziamo le tue informazioni per gestire il tuo account, elaborare transazioni, 
                  fornire servizi di consulenza sugli investimenti e rispettare gli obblighi normativi.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">3. Condivisione delle Informazioni</h3>
                <p>
                  Non vendiamo né condividiamo le tue informazioni personali con terze parti, 
                  eccetto quando richiesto dalla legge o necessario per fornire i nostri servizi.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">4. Sicurezza dei Dati</h3>
                <p>
                  Implementiamo misure di sicurezza di livello istituzionale per proteggere 
                  le tue informazioni personali e finanziarie.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">5. I Tuoi Diritti</h3>
                <p>
                  Hai il diritto di accedere, correggere o eliminare le tue informazioni personali. 
                  Contattaci a privacy@ebridge.ee per esercitare questi diritti.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">6. Contatti</h3>
                <p>
                  Per domande su questa Privacy Policy, contattaci:<br />
                  E-Bridge Capital OÜ<br />
                  Email: privacy@ebridge.ee<br />
                  Telefono: +372 6000 000
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Termini di Servizio</CardTitle>
          <CardDescription>
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full">
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-semibold mb-3">1. Accettazione dei Termini</h3>
                <p>
                  Utilizzando i servizi di E-Bridge Capital OÜ, accetti questi termini di servizio. 
                  Se non accetti questi termini, non utilizzare i nostri servizi.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">2. Servizi Offerti</h3>
                <p>
                  E-Bridge Capital fornisce servizi di gestione patrimoniale per Bitcoin, ETF, 
                  azioni e altri strumenti finanziari a clienti istituzionali e privati.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">3. Rischi degli Investimenti</h3>
                <p>
                  Tutti gli investimenti comportano rischi. I valori degli investimenti possono 
                  diminuire così come aumentare. Le performance passate non garantiscono risultati futuri.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">4. Obblighi del Cliente</h3>
                <p>
                  Il cliente deve fornire informazioni accurate e aggiornate, rispettare 
                  tutte le leggi applicabili e mantenere la riservatezza delle credenziali di accesso.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">5. Limitazione di Responsabilità</h3>
                <p>
                  E-Bridge Capital non sarà responsabile per perdite derivanti da condizioni 
                  di mercato, eventi di forza maggiore o decisioni di investimento del cliente.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">6. Risoluzione delle Controversie</h3>
                <p>
                  Eventuali controversie saranno risolte secondo le leggi dell'Estonia. 
                  La giurisdizione esclusiva sarà quella dei tribunali di Tallinn, Estonia.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">7. Contatti</h3>
                <p>
                  Per domande sui Termini di Servizio:<br />
                  E-Bridge Capital OÜ<br />
                  Email: legal@ebridge.ee<br />
                  Telefono: +372 6000 000
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
