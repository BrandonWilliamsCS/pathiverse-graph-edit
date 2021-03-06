import { app, BrowserWindow } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import * as path from "path";
import { format as formatUrl } from "url";
import { startServer } from "./server/server";

const isDevelopment = process.env.NODE_ENV !== "production";
const serverPort = 3005;

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | undefined;

function createMainWindow() {
  const window = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  });
  window.maximize();
  window.show();

  if (isDevelopment) {
    window.loadURL("http://localhost:3000/index.html");
    window.webContents.openDevTools();
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      }),
    );
  }

  window.on("closed", () => {
    mainWindow = undefined;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  // Use a subdir of the user's data dir for storing/accessing api data
  const userDataDir = app
    .getPath("userData")
    .replace("pathiverse-graph-edit", "pathiverse-electron");
  const apiAccessRoot = path.join(userDataDir, "/pathiverse");
  startServer(apiAccessRoot, serverPort);

  mainWindow = createMainWindow();
});
