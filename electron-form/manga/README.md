Que hace el proyecto
La app consiste en buscar los titulos de los mangas o autores en la pagina manga plus.
Si eliges el título saldrá la descripción y el autor del manga.
Si eliges el autor te dirá las obras hechas por dicho autor.

Como instalar electron
Para hacer este proyecto primero necesitas crear una carpeta, luego entras en la carpeta por terminal, escribes "npm init -y" y luego escribes "npm install electron --save-dev" para que instale electron. Una vez lo hayas hecho se creará la carpeta node_modules.

Como hacer la app
Dentro de la misma carpeta que has creado a principio, junto con la carpeta node_modules, crearás ficheros "index.html", "main.js" y "renderer.js".
En el fichero index.html harás la estructura básica del proyecto, es donde pides los datos al usuario.
En el fichero main.js es donde estarán los ajustes para que al entrar en la terminal y ejecutar el comando "npm start" se te abrirá automaticamente una ventana con lo que haya dentro de tu fichero index.html.
El fichero renderer.js será el encargado de recibir los datos que pongas en el index.html y con los cuales poder saber que quieres buscar.

Avaluación
El programa tiene instalado electron, pero por alguna razón no se abre la ventana ni realiza la busqueda.
Teniendo en cuenta de que una parte funciona pero otra no, creo que debería tener un 5.
