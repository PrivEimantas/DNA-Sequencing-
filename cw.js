"use strict";
const { rejects } = require('assert');
const { resolve } = require('path');
const { off } = require('process');

 // do not modify or delete this line

//Task 1
//data is a string, patterns is an array of patterns
function find(data, patterns) {
	let frequencies={};
	let offsets={};

	function process(string,curPattern,tempOffsets,offset,totalOffset){
	
		let curPatternLen = curPattern.length;
		let stringLen = string.length;
		if(stringLen < curPatternLen){ //if current string is less than pattern, must be invalid
			Object.assign(offsets,{ [curPattern] : tempOffsets}); //create the objects
			Object.assign(frequencies,{[curPattern]: totalOffset}); 
			return undefined; 
		}
		else{

			let tempstr = string.substring(0,curPatternLen); //get new string
			if(tempstr===curPattern){ //if they are equal then append offset
				tempOffsets.push(offset);
				let newstr = string.substring(1);
				process(newstr,curPattern,tempOffsets,offset+1,totalOffset+1); //recursive call
			}
			else{
				let newstr = string.substring(1); //else just get new string but dont push
				process(newstr,curPattern,tempOffsets,offset+1,totalOffset);
			}


		}
	}

    patterns.forEach(function (item){ //for each item in array of patterns
		process(data,item,[],0,0);
		
	})
	
	let temp = { [data] : {frequencies,offsets} }; //create the object
	return temp;
	//returning with [array], if [data] removed numbers still there
	// if use JSON.stringify(temp) gives it with the numbers, so the actual data is there
}

//use these for results of analyse1, analyse2 and analyse3
const results1 = {};
const results2 = {};
const results3 = {};

//Task 2
function analyse1(dataFile, patternFile){

	const fs = require('fs');
		
	let patterns=[];
	
	if(fs.existsSync(dataFile) && fs.existsSync(patternFile)){ //check if files exist
		

		function readPatterns(){
			const entirePatternData = fs.readFileSync(patternFile,'utf-8'); //read
			entirePatternData.split(/\r?\n/).forEach(line =>{ //scan each line
				if(line!=''){ //if empty string ignore
					patterns.push(line);
				}
				
			})
		}

		function readData(){
			const entireDataFile = fs.readFileSync(dataFile,'utf-8'); //read 
			entireDataFile.split(/\r?\n/).forEach(line =>{ //scan each line
				if(line!=''){ //if empty string, ignore
					let temp = find(line,patterns);
					Object.assign(results1,temp); //assign object once pattern sequence has been found

				}
			})


		}

		function start(readData){ 
			setTimeout(()=>{
				readPatterns(); //call read patterns first
			},150);

			setTimeout(()=>{ //call read data
				readData();
				
			},150);

			//setTimeout(()=>{ //print line for results1
			//	console.log(results1);
			//},200);

		}

		start(readData); //call to begin
	
	}
	else{
		console.log("file(s) does not exist"); //file not valid
	}

	

	
	
}

//Task 3

const readFilePromise = (filePath) => {
	
	return new Promise((resolve,rejects)=>{
		let exists = false; //assume false initially
		let fs = require('fs');
		let promiseObj;

		try{
			if(fs.existsSync(filePath)){ //file path true
				exists=true;
			}
		}
		catch(error){
			console.log(error); 
		}

		if(exists===true){
			let data = [];
			const fs = require('fs');
			const entireFile = fs.readFileSync(filePath,'utf-8');
			
			entireFile.split(/\r?\n/).forEach(line =>{ //get rid of \r characters on end of each line
				data.push(line);
				
			})

			promiseObj =[data][0];  //get array
			
			resolve(promiseObj); //set promise
			
		}
		else{


			rejects(console.log("NOT VALID FILE")); 
		}

		

	})

}

function analyse2(dataFile, patternFile){

	let patterns = [];

	const fs = require('fs');
	if(fs.existsSync(dataFile) && fs.existsSync(patternFile)){ //if files do not exist

		function readPatterns(){
			let patternFilePromiseObj = readFilePromise(patternFile);
			

			patternFilePromiseObj.then(value =>{ //for each array (only one)
				value.forEach(line =>{ //read each line in array
					if(line !=''){
						patterns.push(line); //make array of patterns to use for find
					}
				})
			})
			
		}

		function readData(){

			let dataFilePromiseObj = readFilePromise(dataFile);
			
			dataFilePromiseObj.then(value=>{
				value.forEach(line=>{
					if(line !=''){ //had issues when adding in my own test files

						let temp = find(line,patterns);
						
						Object.assign(results2,temp); //assign to object results2
					}
					
				})
				
			})
		}

		function start(readData){

			setTimeout(()=>{ //call functions
				readPatterns();
			},150);

			setTimeout(()=>{
				readData();
				
			},150);

		//	setTimeout(()=>{ //print results2
		//		console.log(results2);
		//	},200);

		}

		start(readData);
	}
	else{
		console.log("file(s) does not exist");
	}
}

//Task 4 

//your implementation for analyse3 goes here
async function analyse3(dataFile,patternFile){

	const fs = require('fs');
	if(fs.existsSync(dataFile) && fs.existsSync(patternFile)){ //check if file exists

		let patterns = []; //temp hold for all patterns
	
		try{
			let patternFilePromiseObj = await readFilePromise(patternFile);
			let dataFilePromiseObj = await readFilePromise(dataFile);

			function readPatterns(){
				patternFilePromiseObj.forEach(line =>{
					if(line !=''){ //files can have empty strings, ignore these
	
						patterns.push(line);
					}
				})
			}
		
			function readData(){
				dataFilePromiseObj.forEach(line=>{ //for each value in array
					if(line !=''){
	
						let temp = find(line,patterns); 
						Object.assign(results3,temp); //store
					}
					
				})
			}

			function start(readData){
				
				setTimeout(()=>{ //call functions
					readPatterns();
				},150);

				setTimeout(()=>{
					readData();
					
				},150);

			//	setTimeout(()=>{ //print results3
			//		console.log(results3);
			//	},200);

			}	
					
			

			start(readData);

		}
		catch(e){
			console.log('catched error: ',e);
		}

	}
	else{
		console.log("file(s) do not exist");
	}
	
	
	
}


//-------------------------------------------------------------------------------
//do not modify this function
function print(){
	console.log("Printing results...");
	Object.keys(results).forEach(function(elem){
		console.log("sequence: ", elem);
		console.log("frequencies are: ", results[elem].frequencies);
		console.log("offsets are: ", results[elem].offsets);
		console.log("---------------------------");
	});
}
//--------------- export the find function (required for the marking script)
module.exports ={find}; //do not modify this line


