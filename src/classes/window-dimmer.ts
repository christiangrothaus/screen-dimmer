import { app, BrowserWindow, screen } from 'electron';

declare const DIMMER_WINDOW_WEBPACK_ENTRY: string;

app.on('ready', () => {
  WindowDimmer.init();
});

class WindowDimmer {
  private static windows: Map<number, BrowserWindow> = new Map();

  private static screens: Electron.Display[] = [];

  static init() {
    this.screens = screen.getAllDisplays();
  }

  static dimWindow(id: number, opacity: number) {
    if (this.windows.has(id)) {
      const existingWindow = this.windows.get(id);
      if (existingWindow) {
        existingWindow.setOpacity(opacity);
        return;
      }
    }

    const window = new BrowserWindow({
      titleBarStyle: 'hidden',
      hasShadow: false,
      resizable: false,
      focusable: false,
      frame: false,
      movable: false,
      transparent: true,
    });
    window.setIgnoreMouseEvents(true);
    window.setOpacity(opacity);
    window.setAlwaysOnTop(true, 'screen-saver');
    window.setVisibleOnAllWorkspaces(true);
    window.setFullScreenable(false);
    window.setSkipTaskbar(true);
    window.loadURL(DIMMER_WINDOW_WEBPACK_ENTRY);
    const screen = this.getScreenById(id);
    if (screen) {
      window.setBounds(screen.bounds);
    }
    this.windows.set(id, window);
  }

  private static getScreenById(id: number) {
    return this.screens.find(screen => screen.id === id);
  }
}

export default WindowDimmer;
