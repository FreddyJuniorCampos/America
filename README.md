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

## Uso

### Controladores

#### Campus

Posee todos los métodos correspondientes a un CRUD para la información de las sedes de la copa.

#### Country

Posee todos los métodos correspondientes a un CRUD para la información de las selecciones que participan en la copa. Al ser usado el método get y proveyendo el id de la selección o el nombre de esta, la respuesta es toda la información referente a la selección, incluyendo jugadores, director técnico, partidos de local y visitante.

#### CountryDt

Posee todos los métodos correspondientes a un CRUD para la información de los Directores técnicos para cada selección. Es en este controlador donde se puede crear el director técnico por el id de la selección.

#### Cup-data

Solo posee el método get para obtener toda la información referente a la copa.

#### Group

Posee todos los métodos correspondientes a un CRUD para la información de los grupos de la copa. Cada grupo solo puede tener un máximo de 5 selecciones, al tratar de agregar más es lanzado un error. Al ser usado el método get y proveyendo el id de un grupo, la respuesta es toda la información referente al grupo, incluyendo los equipos que conforman dicho grupo.

#### Match

Posee todos los métodos correspondientes a un CRUD para la información de los partidos de la copa. Al ser usado el método get y proveyendo el id de un partido, la respuesta es toda la información referente al partido, incluyendo equipo local, equipo visitante, sede, arbitro, fase del torneo, etc.

#### Player

Posee todos los métodos correspondientes a un CRUD para la información de los jugadores de la copa. Al tratar de crear un jugador se verifica que la selección no haya alcanzado el máximo de jugadores permitidos (23 jugadores por selección), que no exista un jugador en esa selección con el mismo número y además el número "1" solo puede ser utilizado por un Arquero o Portero.

#### Referee

Posee todos los métodos correspondientes a un CRUD para la información de los arbitros de la copa.

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
