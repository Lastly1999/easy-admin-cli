#! /usr/bin/env node
const program = require('commander');
// import { program } from "commander"; //用于捕获命令
const chalk = require("chalk") //用于字体加色
const download = require("download-git-repo") //用于下载模板
const ora = require("ora") //用于显示下载中的loading
const inquirer = require("inquirer") //用于命令行交互
const symbols = require("log-symbols")
const fs = require("fs")

// console.log(chalk.green("hello,cli!"));
// console.log(symbols.success, chalk.green("SUCCESS"));
// console.log(symbols.error, chalk.green("ERROR"));
const proce = ora("正在下载模板")
// //开始下载
// proce.start()
// //下载失败调用
// proce.fail()
// //下载成功调用
// proce.succeed()
console.log(process.cwd() + '')

program
	.version(require("../package").version, "-v,--version")
	.command("init")
	.action((name) => {
		inquirer
			.prompt([
				{
					type: "input",
					name: name,
					message: "请输入你的项目名称",
				}])
			.then(async (answers) => {
				proce.start()
				download("direct:https://github.com/Lastly1999/easy-nest-admin-framework.git#master", process.cwd() + '/' + name, { clone: true }, (err) => {
					if (err) {
						proce.fail()
						console.log(err);
					} else {
						proce.succeed()
						console.log(symbols.success, chalk.green("EasyAdmin项目初始化成功"));
					}
				}
				)
			});
	});

program.parse(process.argv);