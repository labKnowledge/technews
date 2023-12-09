// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
 function activate(context) {

	console.log('Congratulations, your extension "technews" is now active!');
	
	
	let disposable = vscode.commands.registerCommand('technews.updates', 
	async function () {
		const editor = vscode.window.activeTextEditor;
		const currentPosition = editor.selection.active;
		const currentLine = currentPosition.line;

		const endLine = new vscode.Position(currentLine, editor.document.lineAt(currentLine).range.end.character);

		if(editor){
			const text = editor.document.getText(editor.selection);
			if(text){
				const res = await ageDetector(text);
				editor.edit(editBuilder =>{
					editBuilder.insert(endLine, "\n" +res)
				});
					
			}
		}
	});

	context.subscriptions.push(disposable);
}


async function ageDetector(name){
	const result = await axios.get("https://api.agify.io/?name="+name);
	const output = `For name ${result.data.name}, your possible age is ${result.data.age}`;
	vscode.window.showInformationMessage(output);
	return output;
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
