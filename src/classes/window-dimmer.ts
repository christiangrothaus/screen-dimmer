import { BrowserWindow, screen } from 'electron';

declare const DIMMER_WINDOW_WEBPACK_ENTRY: string;

class WindowDimmer {
  private static windows: Map<number, BrowserWindow> = new Map();

  static dimWindow(id: number, opacity: number) {
    if (this.windows.has(id)) {
      const existingWindow = this.windows.get(id);
      if (existingWindow) {
        existingWindow.setOpacity(opacity);
        return;
      }
    }

    const screenToDim = this.getScreenById(id);
    if (!screenToDim) return;

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
    window.setBounds(screenToDim.bounds);
    this.windows.set(id, window);
  }

  static getScreenById(id: number) {
    return screen.getAllDisplays().find(display => display.id === id);
  }
}

export default WindowDimmer;
