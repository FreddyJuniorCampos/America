# America

Esta aplicación se genera mediante [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) con
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Instalar dependencias

De forma predeterminada, las dependencias se instalaron cuando se generó esta aplicación. Siempre que las dependencias en son cambiadas en el `package.json`. Se ejecuta el siguiente comando.

```sh
npm install
```

Para instalar solo dependencias resueltas en `package-lock.json`:

```sh
npm ci
```

## Ejecuta la aplicación

```sh
npm start
```

También puede ejecutar `node .` para omitir el paso de compilación.

Abre http://127.0.0.1:3000 en tu navegador.

## Reconstruir el proyecto

Para construir el proyecto de forma incremental:

```sh
npm run build
```

Para forzar una compilación completa limpiando los artefactos almacenados en caché:

```sh
npm run rebuild
```

## Solucionar problemas de formato y estilo de código

```sh
npm run lint
```

Para solucionar automáticamente estos problemas:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrar esquemas de base de datos para modelos
- `npm run openapi-spec`: Genere la especificación de OpenAPI en un archivo
- `npm run docker:build`: Cree una imagen de Docker para esta aplicación
- `npm run docker:run`: Ejecute esta aplicación dentro de un contenedor Docker

## Que sigue

Por favor consulte [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) para que entienda cómo puede continuar agregando funciones a esta aplicación.

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
