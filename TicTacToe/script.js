	var name1; 
	var score1=0;
	var name2;
	var score2=0;
	var size=1;
	var pointsRequired=0;
	var winner;
	var steps = 0;
	var currentPlayer = 'x';
	var isAI = false;

	var resultTable = [];

function lockO(){
	$('#name2').prop("disabled", true);
	$('#name2').val('AI');
	$('#difficulty').attr('disabled', false);
	isAI = true;
}
function unlockO(){
	$('#name2').prop("disabled", false);
	$('#name2').val('');
	$('#difficulty').attr('disabled', 'disabled');
	isAI = false;
	
}
function submitNames(){

	if( $('#name1').val()!=""){
		name1 = $('#name1').val();
	} else name1 = "X";

	if(name2 = $('#name2').val()!=""){
		name2 = $('#name2').val();
	} else name2 = "O";  


	$('form').remove();
	$("a").remove(".tictactoename"); 
	createTable();
}

function clearTable(){

	$('#p1id').remove();
	$('#p2id').remove();
	resultTable = [];
	steps=0;
	
	for(var i=0; i<size; i++){

	$('#idtr').remove(); //removes each row
	}

}

function createTable(){

	var newTable='';
	var boxId =1;

	for (var j=1; j<size+1; j++){		
		newTable = newTable + '<tr id="idtr">';

		for (var i=1; i<size+1; i++){
			newTable = newTable + '<td><input class="add-button" type="button" enabled value="" id="'+boxId+'"/></td>';
			boxId++;
		}

		newTable = newTable + '</tr>';		
	}

	$('.field').append(newTable);
	$('.field').append('<tr><td><a id="p1id">'+name1+'    '+score1+'</a></td><td><a id="p2id">'+name2+' '+score2+'</a></td>');
}

function isWinner (){

var tempX=0;
var tempO=0;
var i=1;
var f=0;
var prevX=0; var prevO=0;
	for (var j=0; j<size; j++){    							//checking row by row

		f = size*j + 1;

		for (i=f; i<=size*(j+1); i++){
			if( $('#'+i).val() == 'X'){ 						//if current value equals X increase the iterator. When iterator equals the size of the field => point the winner :)
				if(i-prevX==1 || tempX==0){						
					tempX++; 
					prevX=i;									//prev to check if fields are in row (to avoid spaces)
				}

			}	

			if( $('#'+i).val() == 'O'){ 			
				if(i-prevO==1 || tempO==0){						
					tempO++; 
					prevO=i;											
				}	

			}		

		}

		if (tempX >= pointsRequired) {							//no of points required
			winner = name1;
			return 1;
		}
		if(tempO >= pointsRequired) {
			winner = name2;
			return 2;
		}
	   tempX=0;
	   tempO=0;
	}

	prevX=0;prevO=0;
	for (var j=0; j<size; j++){    								//checking column by column

		f = j + 1
   
	   for (i=f; i<=size*size; i=i+size){
		   if($('#'+i).val()=='X'){
			   if(i-prevX == size || tempX == 0){ 				
					tempX++;
					prevX=i;
			   }

		   }	

		   if($('#'+i).val()=='O'){ 				
				if(i-prevO == size || tempO == 0){ 				
					tempO++;
					prevO=i;
				}

			}		
   
	   }
   
	   if(tempX >= pointsRequired) {
		   winner = name1;
		   return 1;
	   }

	   if(tempO >= pointsRequired) {
			winner = name2;
			return 2;
		}

	   tempX=0;
	   tempO=0;
   }	

   for (var j=0; j<size*size; j++){    							//checking diagonally1 left-up->right-down

	f = j + 1

		for (i=f; i<=size*size; i=i+size+1){
			if($('#'+i).val()=='X'){ 				
				tempX++;
				}	

			if($('#'+i).val()=='O'){ 				
					tempO++;
				}	

		}

		if(tempX >= pointsRequired) {
			winner = name1;
			return 1;
		}

		if(tempO >= pointsRequired) {
			winner = name2;
			return 2;
		}

		tempX=0;
		tempO=0;
	}


	var prev=1; var row=0; var rows=[]; var isInRow = 1;
	for (var j=1; j<=size*size; j++){    							//checking diagonally1 right-up->left-down

	for (i=j; i<=size*size; i=i+size-1){
		if($('#'+i).val()=='X'){ 
			
			if(i % size == 0) {
				row = i/size;	
				if(!rows.includes(row)) {
					rows.push(row); 
					isInRow=0;
				}
				else isInRow = 1;
			}

			else{
				row = Math.floor(i/size) + 1;
				if(!rows.includes(row)) {
					rows.push(row); 
					isInRow = 0;
				}
				else isInRow=1;	
			}

				if(isInRow == 0 || tempX == 0){
					if(i-prev == size-1 ||tempX == 0){
						tempX++;									
						prev=i;  
						
						if(tempX >= pointsRequired) {
							winner = name1;
							return 1;
						}

					}

				}

			}
			
		}
		tempX=0;
		rows=[];

	for (i=j; i<=size*size; i=i+size-1){
			
			if($('#'+i).val()=='O'){ 
		
				if(i % size == 0) {
					row = i/size;	
					
					if(!rows.includes(row)) {
						rows.push(row); 
						isInRow=0;
					}
					else isInRow = 1;
				}

				else{
					row = Math.floor(i/size) + 1;
					
					if(!rows.includes(row)) {
						rows.push(row); 
						isInRow = 0;
					}
					else isInRow=1;	
				}

				if(isInRow == 0 || tempO == 0){
					
					if(i-prev == size-1 ||tempO == 0){
						tempO++;										
						prev=i;  
								
						if(tempO >= pointsRequired) {
							winner = name2;
							return 2;
						}
					}
				}
			}
				
		}
		tempO=0;
	}

}

function getRandom(){

	
	do{
		var r = Math.floor(Math.random() * (size*size - 1) + 1); console.log('frn:'+r+' '+resultTable.includes(r));
	}while (resultTable.includes(r));
	return r;
}
function computerMove(){
	randomNumber = getRandom(); console.log('rr:'+randomNumber);
				$('#'+randomNumber).val("O");
				$('#'+randomNumber).prop("disabled", "disabled");
				currentPlayer = 'x'
				resultTable.push(randomNumber);
				
}
function checkWinner(){

	if (isWinner() == 1){ 
		winner = name1;
		score1++;
		alert(name1+" wins!");
		clearTable();
		steps=0;
		createTable(size); 
		return;
	}

	if (isWinner() == 2){
		winner = name2;
		score2++; 
		alert(name2+" wins!");
		clearTable();
		steps=0;
		createTable(size); 
		return;
	}

	
	if(steps>=size*size){
		alert("No winner");
		clearTable();steps=0;
		createTable(size); return;
	}

}



$(document).ready(function() {
	
	$('.subNames').click(function() {

	size = document.getElementById('mySelect').value;
	pointsRequired = document.getElementById('sel').value;
	size = parseInt(size,10);
	pointsRequired = parseInt(pointsRequired,10);

	if(pointsRequired>size){
		alert("Points required can not be bigger than the size of the board!");
		window.location.reload(true);
	}

	submitNames();
	});



	$(document).on('click', '.add-button', function() {
		
		if(!isAI){

			steps++;

			if(currentPlayer ==='x'){
				this.value = 'X';
				this.disabled = true;
				currentPlayer = 'o';
				checkWinner();				
			}

			else { 	
					this.value = 'O';
					this.disabled = true;
					currentPlayer = 'x'
					checkWinner();
				
				
			}
		}

		else{ //AI-easy as for now
			currentPlayer = 'x';
			this.value = 'X';
			this.disabled = true;
			steps++;
			checkWinner();
			currentPlayerPlayer = 'o';
			var parsedID = parseInt(this.id,10);
			resultTable.push(parsedID);
			computerMove();
			steps++;
			checkWinner();
		}
		
		
	});
});
