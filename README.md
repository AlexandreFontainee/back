# back

Téléchargez le back end. 


Une fois télchargé: 

. npm ci   

* afin de récupérer nodes_modules

.Créez un fichier .env dans le projet

Dans ce dossier .env veuillez ajouter: 

logMongoDb= 'mongodb+srv://testeur:testPassWord@cluster0.zktoj.mongodb.net/?retryWrites=true&w=majority'

* LogMongoDb va vous permettre de vous connecter à la base de donnée mongo avec un compte invité.

et

SecretToken= ' ****** ' 

* ajouter un mot de passe a 'secretToken' qui vous servira de JWT, un token de sécurité 


Une fois tout cela configuré vous pouvez lancer le code en rentrant "npm run nodemon" dans le terminal. 

PS: Le dossier image n'est pas vide afin qu'il vous reste des images d'anciens utilisateurs mais ne sera pas mis à jours sur le github. 
. Vous pouvez tester le mode admin avec les logs suivant: 
email: admin@gmail.com
mot de passe: test
