# my-g-drive-backend
Subir archivos en determinadas carpetas y crear carpetas si es necesario
# API

| Metodo | Nombre | Descripcion |
|--------|--------|-------------|
| GET    | files  | Trae un objeto con dos elementos tree y numFiles, tree es el arbol de carpetas existente y numFiles si esa carpeta tienes archivos |
| POST   | upload | Permite subir archivos indicando: el camino, el nombre para los archivos, y archivos a subir |

