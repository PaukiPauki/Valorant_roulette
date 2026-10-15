const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('node:path');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1180,
		height: 760,
		minWidth: 900,
		minHeight: 620,
		icon: path.join(__dirname, 'launcher_icon.ico'),
		frame: false,
		transparent: true,
		backgroundColor: '#00000000',
		alwaysOnTop: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false
		}
	});

	mainWindow.setAlwaysOnTop(true, 'screen-saver');
	mainWindow.loadFile(path.join(__dirname, 'in_game.html'));
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.whenReady().then(() => {
	createWindow();

	globalShortcut.register('CommandOrControl+Shift+X', () => {
		if (!mainWindow) return;
		if (mainWindow.isVisible()) {
			mainWindow.hide();
		} else {
			mainWindow.show();
			mainWindow.focus();
		}
	});
});

ipcMain.on('quit-app', () => app.quit());

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
	app.quit();
});
