
        (function () {
            "use strict";
            var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages, typedChars, pressedKey, winCount = 0;

            function setup() {
                pressedKey = false;
                /* start config options */
                availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                lives = 5;
                words = ["HARRY", "HERMOINE", "RON", "SNAPE", "DUMBLEDORE", "HUFFLEPUFF", "RAVENCLAW", "SLYTHERIN", "GRIFFINDOR", "HAGRID", "VOLDEMORT", "QUIDDITCH"];
                messages = {
                    win: 'You win!',
                    lose: 'Game over!',
                    guessed: ' already guessed, please try again...',
                    validLetter: 'Please enter a letter from A-Z',
                    winCountMsg: 'Wins:'
                };
                /* end config options */

                lettersGuessed = lettersMatched = typedChars = '';
                numLettersMatched = 0;

                /* choose a word */
                currentWord = words[Math.floor(Math.random() * words.length)];

                /* make #man and #output blank, create vars for later access */
                output = document.getElementById("output");
                man = document.getElementById("man");
                guessInput = document.getElementById("letter");

                man.innerHTML = 'You have ' + lives + ' lives remaining';
                output.innerHTML = '';
                document.querySelector("#guessedletters").innerHTML = '';

                document.getElementById("numOfWins").innerHTML = '' + messages.winCountMsg + winCount;

                document.getElementById("letter").value = '';

                /* make sure guess button is enabled */
                guessButton = document.getElementById("guess");
                guessInput.style.display = 'inline';
                guessButton.style.display = 'inline';

                /* set up display of letters in current word */
                letters = document.getElementById("letters");
                letters.innerHTML = '<li class="current-word">Current word:</li>';

                var letter, i;
                for (i = 0; i < currentWord.length; i++) {
                    letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
                    letters.insertAdjacentHTML('beforeend', letter);
                }
            }

            function gameOver(win) {
                if (win) {
                    output.innerHTML = messages.win;
                    output.classList.add('win');
                    winCount = 1 + winCount;
                } else {
                    output.innerHTML = messages.lose;
                    output.classList.add('error');
                }

                guessInput.style.display = guessButton.style.display = 'none';
                guessInput.value = '';

                setup();
                document.getElementById("letter").focus();

            }

            /* Start game - should ideally check for existing functions attached to window.onload */
            window.onload = setup();

            /* buttons */
            document.getElementById("restart").onclick = setup;

            document.onkeydown = function () {
                if (!pressedKey) {
                    pressedKey = true;
                    alert("Key Pressed");
                }

                document.getElementById("startMsg").style.display = "none";


                document.getElementById("letter").focus();
            }

            /* reset letter to guess on click */
            guessInput.onclick = function () {
                this.value = '';
            };

            /* main guess function when user clicks #guess */
            document.getElementById('hangman').onsubmit = function (e) {
                if (e.preventDefault) e.preventDefault();
                output.innerHTML = '';
                output.classList.remove('error', 'warning');
                guess = (guessInput.value).toUpperCase();


                /* does guess have a value? if yes continue, if no, error */
                if (guess) {
                    /* is guess a valid letter? if so carry on, else error */
                    if (availableLetters.indexOf(guess) > -1) {

                        /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                        if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                            output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                            output.classList.add("warning");
                        }
                        /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                        else if (currentWord.indexOf(guess) > -1) {
                            var lettersToShow;
                            lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                            for (var i = 0; i < lettersToShow.length; i++) {
                                lettersToShow[i].classList.add("correct");
                            }

                            /* check to see if letter appears multiple times */
                            for (var j = 0; j < currentWord.length; j++) {
                                if (currentWord.charAt(j) === guess) {
                                    numLettersMatched += 1;
                                }
                            }

                            lettersMatched += guess;
                            if (numLettersMatched === currentWord.length) {
                                gameOver(true);
                            }

                            document.querySelector("#guessedletters").innerHTML = lettersGuessed;

                        }
                        /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
                        else {
                            console.log(lettersGuessed += guess);
                            lives--;
                            document.querySelector("#guessedletters").innerHTML = lettersGuessed;
                            
                            man.innerHTML = 'You have ' + lives + ' lives remaining';
                            if (lives === 0) gameOver();
                        }
                    }
                    /* not a valid letter, error */
                    else {
                        output.classList.add('error');
                        output.innerHTML = messages.validLetter;
                    }
                }
                /* no letter entered, error */
                else {
                    output.classList.add('error');
                    output.innerHTML = messages.validLetter;
                }
                return false;
            };
        }());

        function initialVal() {

            // document.onkeyup = function(event){
            //  window.onload = function() {
            // document.getElementById("Box1").focus();
        };
      //  }

