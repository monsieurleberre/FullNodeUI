import { app, BrowserWindow, Menu, nativeImage, screen, Tray } from "electron";
import * as path from "path";
import * as url from "url";
import * as os from "os";
import { UiConfigSerialiser } from './src/app/shared/classes/ui-config-serialier'

let serve;
let testnet;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve" || val === "-serve");
testnet = args.some(val => val === "--testnet" || val === "-testnet");

try {
  require("dotenv").config();
} catch {
  console.log("asar");
}

require("electron-context-menu")({
  showInspectElement: serve
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 650,
    frame: true,
    minWidth: 1200,
    minHeight: 650,
    title: "Stratis Wallet"
  });

  if (serve) {
    require("electron-reload")(__dirname, {});
    mainWindow.loadURL("http://localhost:4200");
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  if (serve) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is going to close.
  mainWindow.on("close", () => { });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

const uiConfig = UiConfigSerialiser.GetAppDataConfig();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (serve) {
    console.log(
      "Stratis UI was started in development mode. This requires the user to be running the Stratis Full Node Daemon himself."
    );
    if (uiConfig.startNode)
      console.debug("In non DEV mode, configuration would have started a node");
  } else {
    if (uiConfig.startNode) startStratisApi();
  }
  createTray();
  createWindow();
  if (os.platform() === "darwin") {
    createMenu();
  }
});

app.on("before-quit", () => {
  closeStratisApi();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

function closeStratisApi() {
  if (process.platform === "darwin" || serve) {
    console.debug("Leaving without closing the Stratis API");
  }
  let apiCall;
  if (uiConfig.apiUrl) {
    apiCall = {
      hostname: uiConfig.apiUrl.hostname,
      port: uiConfig.apiUrl.port,
      path: uiConfig.apiUrl.pathname
    };
  } else {
    apiCall = {

      hostname: uiConfig.apiUrl.hostname,
      port: testnet ? 38221 : 37221,
      path: "api"
    };
  }
  apiCall.path += "/node/shutdown";
  apiCall.method = "POST";

  var http2 = require("http");

  const req = http2.request(apiCall, res => { });
  req.write("");
  req.end();
}

function startStratisApi() {
  var stratisProcess;
  const spawnStratis = require("child_process").spawn;

  //Start Stratis Daemon
  let apiPath = path.resolve(__dirname, "assets//daemon//Stratis.StratisD");
  if (os.platform() === "win32") {
    apiPath = path.resolve(
      __dirname,
      "..\\..\\resources\\daemon\\Stratis.StratisD.exe"
    );
  } else if (os.platform() === "linux") {
    apiPath = path.resolve(
      __dirname,
      "..//..//resources//daemon//Stratis.StratisD"
    );
  } else {
    apiPath = path.resolve(
      __dirname,
      "..//..//resources//daemon//Stratis.StratisD"
    );
  }

  if (!testnet) {
    stratisProcess = spawnStratis(apiPath, {
      detached: true
    });
  } else if (testnet) {
    stratisProcess = spawnStratis(apiPath, ["-testnet"], {
      detached: true
    });
  }

  stratisProcess.stdout.on("data", data => {
    writeLog(`Stratis: ${data}`);
  });
}

function createTray() {
  //Put the app in system tray
  let trayIcon;
  if (serve) {
    trayIcon = nativeImage.createFromPath("./src/assets/images/icon-tray.png");
  } else {
    trayIcon = nativeImage.createFromPath(
      path.resolve(__dirname, "../../resources/src/assets/images/icon-tray.png")
    );
  }

  let systemTray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Hide/Show",
      click: function () {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      }
    },
    {
      label: "Exit",
      click: function () {
        app.quit();
      }
    }
  ]);
  systemTray.setToolTip("Stratis Wallet");
  systemTray.setContextMenu(contextMenu);
  systemTray.on("click", function () {
    if (!mainWindow.isVisible()) {
      mainWindow.show();
    }

    if (!mainWindow.isFocused()) {
      mainWindow.focus();
    }
  });

  app.on("window-all-closed", function () {
    if (systemTray) systemTray.destroy();
  });
}

function writeLog(msg) {
  console.log(msg);
}

function createMenu() { }
