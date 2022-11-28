
## Electron

### Init

    npm run add:electron

This command runs:
    
- Add @capacitor-community/electron
- Install sqlite3, @types/sqlite3,  jszip, node-fetch, 
- Copy db from main assets directory to electron assets directory.
- Copy resources (icon, splash) into assets directory.

### Error

- Running electron app for the first time:

`Refused  to  load  the  font  '<URL>'  because  it  violates  the  following  Content  Security  Policy  directive: "default-src capacitor-electron://* 'unsafe-inline' devtools://* 'unsafe-eval' data:". Note  that  'font-src'  was  not  explicitly  set, so  'default-src'  is  used  as  a  fallback.`

### Solution: 

- Update setup.ts:

Content-Security-Policy

    electronIsDev ? \`default-src ${customScheme}://* 'unsafe-inline' devtools://* 'unsafe-eval' data:; font-src 'self' data: https://fonts.gstatic.com;`: `default-src ${customScheme}://* 'unsafe-inline' data:; font-src 'self' data: https://fonts.gstatic.com;`

- Create  `tsconfig.serve.json`  in  electron for debugging:

{ 

    {
    "compilerOptions": {
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "outDir": "./build",
    "importHelpers": true,
    "target": "ES2017",
    "module": "CommonJS",
    "esModuleInterop": true,
    "typeRoots": ["./node_modules/@types"],
    "allowJs": true,
    "rootDir": ".",
    "types": ["node"],
    "lib": ["es2017","es2016","es2015","dom"]
    },
    "include": ["./src/**/*", **"./capacitor.config.ts"**, "./capacitor.config.js", "./capacitor.config.json"],
    "exclude": ["node_modules", "**/*.spec.ts"]
    }
    

- check  if  icon  and  splash  are  correct
- add zoom behaviour controlled with keyboard:
- Add code in setup.ts inside init()


       import { ipcMain } from 'electron';
    
    ipcMain.on('openInspectDeveloper', (event, data) => { this.MainWindow.webContents.openDevTools(); event.returnValue = true; });
    
    ipcMain.on('zoomChanged', (event, zoom) => { var currentZoom = this.MainWindow.webContents.getZoomFactor(); if (zoom === "in") { this.MainWindow.webContents.zoomFactor = currentZoom + 0.1; }
    
    if (zoom === "out") { this.MainWindow.webContents.zoomFactor = currentZoom - 0.1; } event.returnValue = true; });

- update  `electron/preload.ts`

        require('./rt/electron-rt'); 
        //////////////////////////////
      
        // User Defined Preload scripts below
        
        console.log('User Preload!');
        
        const { contextBridge, ipcRenderer } = require('electron');
        
        ///////Do Not Edit////////
        
        //require("./node_modules/@capacitor-community/electron/dist/electron-bridge.js");
        
        /////////////////////////
        contextBridge.exposeInMainWorld('electron', {
    	    ipc: { ...ipcRenderer }
        })

  

- add  url  repository (github) in  package.json  electron

## Android

- add  `android:networkSecurityConfig="@xml/network_security_config"`  in  `AndroidManifest.ml`

     network_security_config.xml

    `<?xml  version="1.0"  encoding="utf-8"?>
    <network-security-config>
    <base-config  cleartextTrafficPermitted="true">
    </base-config>
    </network-security-config>`

 
- add permission  in  `AndroidManifest.xml`

`<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" /><uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />`

- `Error: Android  Gradle  plugin  requires  Java  11  to  run. You  are  currently  using  Java  1.8`: change  IDE  settings  JVM used by gradle
