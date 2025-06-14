
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Upload, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/components/AuthProvider';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    website: '',
    avatar_url: '',
    phone: '',
    address: '',
    bio: ''
  });

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          username: data.username || '',
          website: data.website || '',
          avatar_url: data.avatar_url || '',
          phone: '',
          address: '',
          bio: ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}/avatar.${fileExt}`;

    setUploading(true);

    try {
      // Remove old avatar if exists
      if (profile.avatar_url) {
        await supabase.storage.from('avatars').remove([`${user?.id}/avatar.png`, `${user?.id}/avatar.jpg`, `${user?.id}/avatar.jpeg`, `${user?.id}/avatar.webp`]);
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const avatarUrl = data.publicUrl;

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        throw updateError;
      }

      setProfile(prev => ({ ...prev, avatar_url: avatarUrl }));

      toast({
        title: "Foto profilo aggiornata",
        description: "La tua foto profilo è stata caricata con successo.",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare la foto profilo. Riprova.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          username: profile.username,
          website: profile.website,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Profilo aggiornato",
        description: "Le tue informazioni sono state salvate con successo.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il profilo. Riprova.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Impostazioni Profilo</h1>
        <p className="text-sm text-gray-600 mt-1">Gestisci le tue informazioni personali</p>
      </div>

      <div className="grid gap-6">
        {/* Avatar e Informazioni Base */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4" />
              Informazioni Personali
            </CardTitle>
            <CardDescription className="text-sm">Aggiorna le tue informazioni di base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-lg">
                  {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" disabled={uploading} asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        {uploading ? 'Caricamento...' : 'Carica Foto'}
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">JPG, PNG o WebP. Max 5MB.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Nome Completo</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  placeholder="Mario Rossi"
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="mario.rossi"
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Sito Web</Label>
              <Input
                id="website"
                value={profile.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://www.example.com"
                className="text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Informazioni di Contatto */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Informazioni di Contatto
            </CardTitle>
            <CardDescription className="text-sm">Le tue informazioni di contatto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="text-sm bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">L'email non può essere modificata da qui</p>
            </div>

            <div>
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+39 333 123 4567"
                className="text-sm"
              />
            </div>

            <div>
              <Label htmlFor="address">Indirizzo</Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Via Roma 123, 00100 Roma, Italia"
                className="text-sm"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Biografia</CardTitle>
            <CardDescription className="text-sm">Racconta qualcosa di te</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Scrivi una breve descrizione di te..."
              className="text-sm"
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Salva */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="text-sm">
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Salvataggio...' : 'Salva Modifiche'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
