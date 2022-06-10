# TEST ALUXION

✔️ Login.

- Si las credenciales son incorectas se envia un mensaje que las credenciales no son correctas

✔️ Registro.

✔️ recuperar contraseña con envio de correo.

- se envia el correo con el link de recuperacion.
- El token de recuperacion que dura 10 minutos.
- se verifica que la contraseña no sea similar a la enterior.
- Una vez se establece la nueva contraseña se envia un correo informando del cambio.

✔️ Subida de archivos a S3.

- Se valida que efectivamente se este subiendo un archivo.
- Datos que se guardan en la base de datos;
  
  - user_id: id del usuario que subio el archivo.
  - name: Nombre del archivo.
  - urlImage: URI de la imagen en AWS. 

✔️ Descarga de archivos desde S3.

- Para la descarga de la imagen se debe colocar en el href del link de descarga la url de la imagen guardada en la base de datos.
  
```html
<a href="https://bucket-name.s3.amazonaws.com/file-name">link de descarga</a>
```

- Para visualizar la imagen se debe colocar en el atributo ***src*** de una etiqueta ***img*** la url que se guardo en la base de datos.

```html
<img src="https://bucket-name.s3.amazonaws.com/file-name">
```

✔️ Gestor de archivos

- Cambio de nombre en S3 y base de datos
- Nuevo enlace del archivo en S3

✔️ Integrar unplash.

- Se integro la api de unplash para poder buscar archivos desde ella y mostrarlos al usuario.

⛔ Subir archivos desde unplash.

## Variables de entorno para la API

En el archivo de ejemplo [env.example](.env.example) se muestran las variables de entorno que se necesitaran para que el proyecto funcione, mediante correo electronico les enviare las credenciales de la API de Unplash.

## clonar el proyecto

Para clonar el proyecto ejecutar el siguiente comando.

```shell
git clone https://github.com/cdguedez/test_aluxion.git
```

## Instalacion de dependencias

Comando para instalar las dependencias del proyecto.

```shell
npm install
```
