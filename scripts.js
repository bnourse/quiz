var question_count = 0;
var correct_count = 0;
var correct_answer_index = 0;

var questions_array = [
    //[[0]"Question",[1]"Answer 1",[2]"Answer 2",[3]"Answer 3",[4]"Answer 4",[5]Index of correct answer]
    ["What is 2 x 2?", "22", "4", "42","1.6x10^-35",2],
	["Who does number 2 work for?","Dr. Evil","You tell that turd who's boss","Austin Powers", "Goldmember", 1],
	["Dr Who?","Kevorkian","Evil","Just, 'The Doctor'", "Octopus", 3]
] 

window.addEventListener("load", function() {

	set_up_question(question_count);

});

// If question_number is out of bounds of the array either because of tampering or
// a game over state, immediately ends the game, otherwise
// sets the proper game state for questions_array[question_number]
function set_up_question(question_number) {
	if (question_number < 0 || question_number > questions_array.length - 1) {
		game_over();
	}
	else {
		correct_answer_index = questions_array[question_number][5];
		new_question = get_question(question_number);
		set_question_div(new_question);
		question_form = document.getElementsByClassName("question")[0];
		question_form.addEventListener("submit", answer_submitted);
	}
}

// Clears the contents of the question area, then appends the node passed to it
function set_question_div(node) {
	var question_area = document.getElementById("question_area");
	question_area.innerHTML = "";
	question_area.appendChild(node);
}

// Clones the question template node and fills it with values from the contents
// of questions_array[question_number]
// Returns: The filled, cloned node
function get_question(question_number) {
	var question_template = document.getElementById("question_template");
	var new_question = question_template.childNodes[1].cloneNode(true);
	var this_question_array = questions_array[question_number];
	var question_text = this_question_array[0];

	new_question.getElementsByClassName("question_text")[0].textContent = question_text;

	answer_spans = new_question.getElementsByClassName("answer");

	for(i = 0; i < answer_spans.length; i++) {
		answer_spans[i].textContent = this_question_array[i+1];
	}

	return new_question;
}


function answer_submitted(e) {
	e.preventDefault();
	var form_data = new FormData(question_form);
	var answer = form_data.get("answer");
	if (correct(answer)) {
		increment_correct_count();
		increment_question_count();
	}
	else {
		increment_question_count();
	}
	set_up_question(question_count);
}

function correct(answer) {
	return parseInt(answer) == correct_answer_index;
}

function increment_correct_count() {
	correct_count += 1;
	document.getElementsByClassName("correct_count")[0].textContent = correct_count;
}

function increment_question_count() {
	question_count += 1;
	document.getElementsByClassName("question_count")[0].textContent = question_count;
}

function game_over() {
	var percent_correct = ((correct_count/question_count)*100).toFixed(2);	
	alert("Game Over! You answered " + correct_count + " out of " + question_count + 
		" correctly. \nThat's " + percent_correct + "% \nTry again!");
	reset_scoreboard();
	set_up_question(question_count);
}

function reset_scoreboard() {
	question_count = 0;
	document.getElementsByClassName("question_count")[0].textContent = question_count;
	correct_count = 0;
	document.getElementsByClassName("correct_count")[0].textContent = correct_count;
}

