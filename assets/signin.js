const signedincontent = `
<section id="workout" class="fl w-25 vh-100 pa2 flex flex-column items-center bg-washed-red ">
            <h2 class="">Workout Section</h2>
        </section>
        <section class="fr w-75 vh-100 pa2 bg-washed-blue">
            <section id="weekly-schedule" class="dark-blue pa3 flex flex-column items-center">
                <h2>Weekly Schedule</h2>
                <div class="flex mw-100" id="schedule">
                    <span class="ba pa3 pa4-l ma2 tc v-mid" data-day="1" id="day-1">Mon</span>
                    <span class="ba pa3 pa4-l ma2" data-day="2" id="day-2">Tue</span>
                    <span class="ba pa3 pa4-l ma2" data-day="3" id="day-3">Wed</span>
                    <span class="ba pa3 pa4-l ma2" data-day="4" id="day-4">Thu</span>
                    <span class="ba pa3 pa4-l ma2" data-day="5" id="day-5">Fri</span>
                    <span class="ba pa3 pa4-l ma2" data-day="6" id="day-6">Sat</span>
                    <span class="ba pa3 pa4-l ma2" data-day="0" id="day-0">Sun</span>
                </div>
            </section>
            <section id="workbook" class="w-100 flex">
                <section id="add-exercise" class="fl w-40 h-100 pa2">
                    <form class="card pa3">
                        <h3>Add an Exercise</h3>
                        <div class="w-100 pa1 flex flex-column">
                            <label for="exercise-name" class="mb1">Name</label>
                            <input type="text" name="exercise-name" class="mb3">
                            <label for="exercise-desc" class="mb1">Description</label>
                            <textarea name="exercise-desc" rows="4" cols="40" class="mb3"></textarea>
                            <label>Number of Reps</label>
                            <input type="number">
                            <button type="submit" class="btn pa2 mv3">Add to Workout</button>
                        </div>

                    </form>
                </section>
                <section id="new-ideas" class="w-65 pa2 flex flex-column">
                    <section id="find-exercise" class="card pa3">
                        <form id="find-exercise-form">
                            <div class="w-100">
                                <h2>Looking for Exercise Ideas?</h2>
                                <p>Select what you're looking for by word, type, muscle, and/or difficulty to generate
                                    some suggestions.</p>
                            </div>
                            <div class="w-100 pa1 flex flex-column justify-between">
                                <div class="w-50-l ma3 flex flex-column flex-row-l justify-between-l">
                                    <label>Filter by Word</label>
                                    <input type="text" name="exercise-name" placeholder="ex. press, sit, etc.">
                                </div>
                                <div class="w-50-l ma3 flex flex-column flex-row-l justify-between-l">
                                    <label class="w-50">Filter by Type</label>
                                    <select id="type" name="type" class="w-50">
                                        <option value="" selected="selected">Select a type...</option>
                                        <option value="cardio">Cardio</option>
                                        <option value="olympic_weightlifting">Olympic Weightlifting</option>
                                        <option value="plyometrics">Plyometrics</option>
                                        <option value="powerlifting">Powerlifting</option>
                                        <option value="strength">Strength</option>
                                        <option value="stretching">Stretching</option>
                                        <option value="strongman">Strongman</option>
                                    </select>
                                </div>
                                <div class="w-50-l ma3 flex flex-column flex-row-l justify-between-l">
                                    <label class="w-50">Filter by Muscle</label>
                                    <select class="w-50" id="muscle" name="muscle">
                                        <option value="" selected="selected">Select a muscle...</option>
                                        <option value="abdominals">Abdominals</option>
                                        <option value="abductors">Abductors</option>
                                        <option value="adductors">Adductors</option>
                                        <option value="biceps">Biceps</option>
                                        <option value="calves">Calves</option>
                                        <option value="chest">Chest</option>
                                        <option value="forearms">Forearms</option>
                                        <option value="glutes">Glutes</option>
                                        <option value="hamstrings">Hamstrings</option>
                                        <option value="lats">Lats</option>
                                        <option value="lower_back">Lower Back</option>
                                        <option value="middle_back">Middle Back</option>
                                        <option value="neck">Neck</option>
                                        <option value="quadriceps">Quadriceps</option>
                                        <option value="traps">Traps</option>
                                        <option value="triceps">Triceps</option>
                                    </select>
                                </div>
                                <div class="w-25-l ma3 flex flex-column">
                                    <label>Filter by Difficulty</label>
                                    <select id="difficulty" name="difficulty">
                                        <option value="" selected="selected">Select a difficulty...</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <button type="submit" class="btn w-30 mv3">Search</button>
                            </div>
                    </section>
                </section>
                <section class="flex flex-wrap justify-center w-100" id="button-area"></section>
            </section>
`