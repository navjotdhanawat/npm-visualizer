const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ipcMain = electron.ipcMain;
var shell = require('shelljs');


///////////////////////////////////////////////


ipcMain.on('execute', (event, filePath) => {
  if (!filePath) {
    throw new Error('filePath is not defined');
  }

  // var child = shell.exec("tree" + "\n", { async: false });
  // child.stdout.on('data', function (data) {
  //   event.sender.send('execute-close', filePath, { output: data });
  // });



});


ipcMain.on('package-update-all', (event, directory) => {
  if (!directory) {
    throw new Error('filePath is not defined');
  }

  shell.exec(`cd ${directory} && npm update`, function(code, stdout, stderr) {
        event.sender.send('package-update-all-close', directory, { output: stdout });
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });
});

ipcMain.on('package-update', (event, options) => {
  const directory = options.path;
  const packages = options.packages;
  console.log(options);
  if (!directory) {
    throw new Error('filePath is not defined');
  }

  shell.exec(`cd ${directory} && npm update ${packages} --save --json=true`, function(code, stdout, stderr) {
        event.sender.send('package-update-close', directory, { output: stdout });
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });
});

ipcMain.on('package-list', (event, directory) => {
  console.log('Getting Packages...........');
  if (!directory) {
    throw new Error('filePath is not defined');
  }

  // var child = shell.exec("npm ls --json=true" + "\n", { async: true, silent:true });
  // child.stdout.on('data', function (data) {
  //   event.sender.send('package-list-close', directory, { output: data });
  // });

  var counter = 0;
  shell.exec(`cd ${directory} && npm outdated --json=true`, function(code, stdout, stderr) {
        stdout = JSON.parse(stdout);
        event.sender.send('package-list-close', directory, { output: stdout });
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        console.log('Counter------------------' + counter);
        counter++;
    });

  // shell.exec('npm ls --json=true', function(code, stdout, stderr) {
  //   event.sender.send('execute-close', directory, { output: stdout });
  // });
});


//////////////////////////////////////////////////












// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
