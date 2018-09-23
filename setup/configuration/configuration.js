const path = require('path')
const projectPath = "/project";
const appDeploymentLifecyclePath = path.dirname( require.resolve(`@dependency/appDeploymentLifecycle/package.json`) ) 

module.exports = {
    directory: {
        projectPath,
        application: {
            hostAbsolutePath: path.resolve(`${__dirname}/../..`),
            containerAbsolutePath: `${projectPath}/application`
        }
    },
    script: {
        hostMachine: [
            { // example for module path
                type: 'module',
                key: 'containerManager',
                path: './setup/node_modules/@dependency/appDeploymentManager/setup/script/bin/containerManager.js'
            },
            {
                type: 'directory',
                path: './setup/script/hostMachine' // relative to applicaiton repository root.
            }
        ],
        container: [ // entrypoint configuration map, paths are relative to external app.
            {
                key: 'test',
                path: `${appDeploymentLifecyclePath}/containerScript/test`,
            },
            {
                key: 'sleep',
                path: `${appDeploymentLifecyclePath}/containerScript/sleep`,
            }
        ]
    }
}
