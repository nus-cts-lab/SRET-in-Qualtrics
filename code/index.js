Qualtrics.SurveyEngine.addOnload(function () {

  // Retrieve Qualtrics object and save in qthis
  var qthis = this;

  // Hide buttons
  qthis.hideNextButton();

  // Defining and load required resources
  var jslib_url = "https://lhw-1.github.io/jspsych-6.3.1/";
  var requiredResources = [
    jslib_url + "jspsych.js",
    jslib_url + "plugins/jspsych-html-keyboard-response.js",
    jslib_url + "plugins/jspsych-html-button-response.js",
    jslib_url + "plugins/jspsych-fullscreen.js"
  ];

  function loadScript(idx) {
    console.log("Loading ", requiredResources[idx]);
    jQuery.getScript(requiredResources[idx], function () {
      if ((idx + 1) < requiredResources.length) {
        loadScript(idx + 1);
      } else {
        initExp();
      }
    });
  }

  if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
    loadScript(0);
  }


  // Add CSS styling for SRET interface
  var css = '<style>' +
      '#display_stage_background {' +
        'width: 100vw;' +
        'background-color: white;' +
        'z-index: -1;' +
      '}' +
      '#display_stage {' +
        'position: fixed !important;' +
        'left: 1vw !important;' +
        'top: 1vh !important;' +
        'height: 98vh !important;' +
        'width: 98vw !important;' +
        'background-color: white !important;' +
        'box-shadow: 1px 1px 1px #999 !important;' +
        'border-radius: 15px !important;' +
        'z-index: 9999 !important;' +
        'overflow-y: auto !important;' +
        'overflow-x: hidden !important;' +
        'padding: 20px !important;' +
        'font-family: Arial, sans-serif !important;' +
        'display: flex !important;' +
        'align-items: center !important;' +
        'justify-content: center !important;' +
        'visibility: visible !important;' +
      '}' +
      '.sret-fixation {' +
        'font-size: 60px !important;' +
        'text-align: center !important;' +
      '}' +
      '.sret-word {' +
        'font-size: 50px !important;' +
        'text-align: center !important;' +
      '}' +
      '.sret-instructions {' +
        'background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);' +
        'border: none;' +
        'border-radius: 16px;' +
        'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);' +
        'padding: 30px 50px;' +
        'margin: 10px auto;' +
        'max-width: 1200px;' +
        'width: 95%;' +
        'text-align: center;' +
        'position: relative;' +
        'overflow: hidden;' +
        'min-height: 80vh;' +
        'display: flex;' +
        'flex-direction: column;' +
        'justify-content: center;' +
      '}' +
      '.sret-instructions::before {' +
        'content: "";' +
        'position: absolute;' +
        'top: 0;' +
        'left: 0;' +
        'right: 0;' +
        'height: 4px;' +
        'background: #10b981;' +
        'border-radius: 16px 16px 0 0;' +
      '}' +
      '.sret-instructions h2 {' +
        'font-size: 28px;' +
        'font-weight: 700;' +
        'color: #1e293b;' +
        'margin: 0 0 8px 0;' +
        'line-height: 1.2;' +
      '}' +
      '.sret-instructions .subtitle {' +
        'font-size: 16px;' +
        'color: #64748b;' +
        'margin: 0 0 32px 0;' +
        'font-weight: 500;' +
      '}' +
      '.sret-instructions p {' +
        'font-size: 16px;' +
        'line-height: 1.6;' +
        'color: #334155;' +
        'margin: 0 0 16px 0;' +
      '}' +
      '.sret-instructions strong {' +
        'color: #1e293b;' +
        'font-weight: 600;' +
      '}' +
      '.instructions-grid {' +
        'display: grid;' +
        'grid-template-columns: 1fr 1fr;' +
        'gap: 40px;' +
        'margin: 24px 0;' +
        'align-items: start;' +
      '}' +
      '.instruction-card {' +
        'background: rgba(255, 255, 255, 0.7);' +
        'border-radius: 12px;' +
        'padding: 24px;' +
        'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);' +
        'text-align: left;' +
      '}' +
      '.key-highlight {' +
        'background: linear-gradient(135deg, #3b82f6, #1d4ed8);' +
        'color: white;' +
        'padding: 8px 16px;' +
        'border-radius: 8px;' +
        'font-weight: 700;' +
        'font-size: 18px;' +
        'display: inline-block;' +
        'margin: 0 8px;' +
        'box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);' +
      '}' +
      '.continue-prompt {' +
        'background: rgba(16, 185, 129, 0.1);' +
        'border-left: 4px solid #10b981;' +
        'padding: 16px 20px;' +
        'margin: 24px 0 0 0;' +
        'border-radius: 0 8px 8px 0;' +
        'font-weight: 600;' +
        'color: #065f46;' +
      '}' +
      '.speed-warning {' +
        'background: rgba(245, 158, 11, 0.1);' +
        'border-left: 4px solid #f59e0b;' +
        'padding: 16px 20px;' +
        'margin: 24px 0 0 0;' +
        'border-radius: 0 8px 8px 0;' +
        'font-weight: 600;' +
        'color: #92400e;' +
      '}' +
      '.sret-consent {' +
        'border: 2px solid black;' +
        'padding: 40px;' +
        'margin: 0 auto;' +
        'width: 85%;' +
        'max-width: 1000px;' +
        'text-align: center;' +
        'background-color: white;' +
        'min-height: 70vh;' +
        'display: flex;' +
        'flex-direction: column;' +
        'justify-content: center;' +
      '}' +
      '.sret-consent h1 {' +
        'font-size: 28px;' +
        'margin-bottom: 20px;' +
      '}' +
      '.sret-consent p {' +
        'font-size: 16px;' +
        'line-height: 1.5;' +
        'margin-bottom: 15px;' +
        'text-align: left;' +
      '}' +
      '.consent-button {' +
        'background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;' +
        'border: none !important;' +
        'border-radius: 12px !important;' +
        'color: white !important;' +
        'font-size: 18px !important;' +
        'font-weight: 600 !important;' +
        'padding: 16px 32px !important;' +
        'cursor: pointer !important;' +
        'transition: all 0.2s ease !important;' +
        'box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;' +
        'letter-spacing: 0.025em !important;' +
        'min-width: 240px !important;' +
      '}' +
      '.consent-button:hover {' +
        'background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;' +
        'transform: translateY(-2px) !important;' +
        'box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4) !important;' +
      '}' +
      '.consent-button:active {' +
        'transform: translateY(0px) !important;' +
        'box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3) !important;' +
      '}' +
    '</style>';
  
  jQuery(css).appendTo('head');

  // Append the display_stage Div using jQuery
  jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
  jQuery("<div id = 'display_stage'></div>").appendTo('body');

  function initExp() {

    /* create timeline */
    var timeline = [];

    /* get participant ID from Qualtrics */
    var ppt = "${e://Field/PROLIFIC_PID}" || "SRET_" + Math.random().toString(36).substr(2, 9);

    var consent_page = {
      type: "html-button-response",
      stimulus: '<div class="sret-consent">' +
        '<h1>Welcome to the Self-Referential Encoding Task</h1>' +
        '<p>Please consider this information carefully before deciding whether to participate ' +
        'in this research study. The purpose of this research is to examine how people describe themselves.</p>' +
        '<p><strong>If you agree to participate:</strong> You will see words and decide whether they describe you. ' +
        'You will respond by pressing keys on the keyboard. This task takes about 10-15 minutes.</p>' +
        '<p><strong>Your participation is entirely voluntary.</strong> You may withdraw at any time without penalty.</p>' +
        '<p>By clicking the button below, you confirm that you understand the study and agree to participate.</p>' +
        '</div>',
      choices: ['I agree to take part in this study'],
      button_html: '<button class="jspsych-btn consent-button">%choice%</button>',
      margin_vertical: '40px'
    };

    timeline.push(consent_page);

    /* define instructions trial */
    var instructions = {
      type: "html-keyboard-response",
      stimulus: '<div class="sret-instructions">' +
        '<h2>Task Instructions</h2>' +
        '<div class="subtitle">Self-Referential Encoding Task</div>' +
        
        '<p>You will see a cross (+) followed by individual words. Your task is to decide whether each word describes you personally.</p>' +
        
        '<div class="instructions-grid">' +
        
        '<div class="instruction-card">' +
        '<h3 style="color: #1e293b; margin-top: 0;">Word Describes Me</h3>' +
        '<p>If the word <strong>does describe you</strong>, press:</p>' +
        '<div style="text-align: center; margin: 16px 0;">' +
        '<span class="key-highlight">Q</span>' +
        '</div>' +
        '<p style="font-size: 14px; color: #64748b;">Left side of keyboard</p>' +
        '</div>' +
        
        '<div class="instruction-card">' +
        '<h3 style="color: #1e293b; margin-top: 0;">Word Does NOT Describe Me</h3>' +
        '<p>If the word <strong>does not describe you</strong>, press:</p>' +
        '<div style="text-align: center; margin: 16px 0;">' +
        '<span class="key-highlight">P</span>' +
        '</div>' +
        '<p style="font-size: 14px; color: #64748b; text-align: right;">Right side of keyboard</p>' +
        '</div>' +
        
        '</div>' +
        
        '<p><strong>Important:</strong> Answer as quickly and accurately as possible based on your first instinct.</p>' +
        '<p>We will start with a few practice words to help you get familiar with the task.</p>' +
        
        '<div class="continue-prompt">' +
        'Press the SPACEBAR when you\'re ready to begin the practice trials' +
        '</div>' +
        
        '</div>',
      choices: [' ']
    };

    timeline.push(instructions);

    /* practice trials */
    var practice_stimuli = [
      { stimulus: 'young', trialtype: 'practice'},
      { stimulus: 'tall', trialtype: 'practice'},
      { stimulus: 'awake', trialtype: 'practice'},
      { stimulus: 'sore', trialtype: 'practice'},
      { stimulus: 'cold', trialtype: 'practice'}
    ];

    /* real trials */
   var test_stimuli = [
     { stimulus: 'happy', valence: 'positive', trialtype: 'block'},
     { stimulus: 'good', valence: 'positive', trialtype: 'block'},
     { stimulus: 'joyful', valence: 'positive', trialtype: 'block'},
     { stimulus: 'proud', valence: 'positive', trialtype: 'block'},
     { stimulus: 'brilliant', valence: 'positive', trialtype: 'block'},
     { stimulus: 'great', valence: 'positive', trialtype: 'block'},
     { stimulus: 'nice', valence: 'positive', trialtype: 'block'},
     { stimulus: 'excited', valence: 'positive', trialtype: 'block'},
     { stimulus: 'pleased', valence: 'positive', trialtype: 'block'},
     { stimulus: 'glad', valence: 'positive', trialtype: 'block'},
     { stimulus: 'excellent', valence: 'positive', trialtype: 'block'},
     { stimulus: 'wonderful', valence: 'positive', trialtype: 'block'},
     { stimulus: 'loved', valence: 'positive', trialtype: 'block'},
     { stimulus: 'fun', valence: 'positive', trialtype: 'block'},
     { stimulus: 'friendly', valence: 'positive', trialtype: 'block'},
     { stimulus: 'helpful', valence: 'positive', trialtype: 'block'},
     { stimulus: 'confident', valence: 'positive', trialtype: 'block'},
     { stimulus: 'fantastic', valence: 'positive', trialtype: 'block'},
     { stimulus: 'cool', valence: 'positive', trialtype: 'block'},
     { stimulus: 'awesome', valence: 'positive', trialtype: 'block'},
     { stimulus: 'funny', valence: 'positive', trialtype: 'block'},
     { stimulus: 'best', valence: 'positive', trialtype: 'block'},
     { stimulus: 'content', valence: 'positive', trialtype: 'block'},
     { stimulus: 'free', valence: 'positive', trialtype: 'block'},
     { stimulus: 'playful', valence: 'positive', trialtype: 'block'},
     { stimulus: 'kind', valence: 'positive', trialtype: 'block'},
     { stimulus: 'sad', valence: 'negative', trialtype: 'block'},
     { stimulus: 'unhappy', valence: 'negative', trialtype: 'block'},
     { stimulus: 'bad', valence: 'negative', trialtype: 'block'},
     { stimulus: 'angry', valence: 'negative', trialtype: 'block'},
     { stimulus: 'guilty', valence: 'negative', trialtype: 'block'},
     { stimulus: 'upset', valence: 'negative', trialtype: 'block'},
     { stimulus: 'stupid', valence: 'negative', trialtype: 'block'},
     { stimulus: 'horrible', valence: 'negative', trialtype: 'block'},
     { stimulus: 'sorry', valence: 'negative', trialtype: 'block'},
     { stimulus: 'depressed', valence: 'negative', trialtype: 'block'},
     { stimulus: 'worried', valence: 'negative', trialtype: 'block'},
     { stimulus: 'mad', valence: 'negative', trialtype: 'block'},
     { stimulus: 'naughty', valence: 'negative', trialtype: 'block'},
     { stimulus: 'ashamed', valence: 'negative', trialtype: 'block'},
     { stimulus: 'terrible', valence: 'negative', trialtype: 'block'},
     { stimulus: 'scared', valence: 'negative', trialtype: 'block'},
     { stimulus: 'alone', valence: 'negative', trialtype: 'block'},
     { stimulus: 'hateful', valence: 'negative', trialtype: 'block'},
     { stimulus: 'lost', valence: 'negative', trialtype: 'block'},
     { stimulus: 'nasty', valence: 'negative', trialtype: 'block'},
     { stimulus: 'lonely', valence: 'negative', trialtype: 'block'},
     { stimulus: 'unwanted', valence: 'negative', trialtype: 'block'},
     { stimulus: 'silly', valence: 'negative', trialtype: 'block'},
     { stimulus: 'annoyed', valence: 'negative', trialtype: 'block'},
     { stimulus: 'unloved', valence: 'negative', trialtype: 'block'},
     { stimulus: 'wicked', valence: 'negative', trialtype: 'block'}
     ];


    var fixation = {
      type: 'html-keyboard-response',
      stimulus: '<div class="sret-fixation">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([600, 700, 800, 900, 1000], 1)[0];
      },
      data: {
        task: 'fixation'
      }
    }

    var display_stimulus = function(){
                 var html = '<div class="sret-word">'
                 html += jsPsych.timelineVariable('stimulus', true)
                 html += '</div>'
                 return html;
              }

    var sret_trial = {
      type: "html-keyboard-response",
      stimulus: display_stimulus,
      choices: ['q', 'p'],
      data: {
        task: 'sret',
        trialtype: jsPsych.timelineVariable('trialtype'),
        valence: jsPsych.timelineVariable('valence'),
        word: jsPsych.timelineVariable('stimulus')
      },
      on_finish: function(data){
        data.endorse = data.response == 'q';
      }
    }

    var practice_procedure = {
      timeline: [fixation, sret_trial],
      timeline_variables: practice_stimuli,
      randomize_order: true
    }

    timeline.push(practice_procedure);

    // check in block
    var check_in = {
      type: "html-keyboard-response",
      stimulus: function() {

        var trials = jsPsych.data.get().filter({trialtype: 'practice'});
        var rt = Math.round(trials.select('rt').mean());
        var speedcomment = "";
        var speedClass = "continue-prompt";
        
        if (rt < 300) {
          speedcomment = "It takes about half a second to read a word. Please take a moment to think about each word before responding.";
          speedClass = "speed-warning";
        } else if (rt > 2000) {
          speedcomment = "After deciding on your answer, try to respond a bit more quickly.";
          speedClass = "speed-warning";
        } else {
          speedcomment = "Great job! Your response timing looks good.";
        }

        return '<div class="sret-instructions">' +
          '<h2>Practice Complete!</h2>' +
          '<div class="subtitle">Ready for the Main Task</div>' +
          
          '<div class="instructions-grid">' +
          
          '<div class="instruction-card">' +
          '<h3 style="color: #1e293b; margin-top: 0;">Your Performance</h3>' +
          '<p><strong>Average response time:</strong> ' + rt + ' milliseconds</p>' +
          '<div class="' + speedClass + '" style="margin: 16px 0; text-align: center;">' +
          speedcomment +
          '</div>' +
          '</div>' +
          
          '<div class="instruction-card">' +
          '<h3 style="color: #1e293b; margin-top: 0;">Reminder</h3>' +
          '<p>For the main task, remember:</p>' +
          '<p>• Read each word carefully</p>' +
          '<p>• <span class="key-highlight">Q</span> = Describes me</p>' +
          '<p>• <span class="key-highlight">P</span> = Does not describe me</p>' +
          '<p>• Trust your first instinct</p>' +
          '</div>' +
          
          '</div>' +
          
          '<div class="continue-prompt">' +
          'Press the SPACEBAR to begin the main experiment' +
          '</div>' +
          
          '</div>';
      },
      choices: [' '],
    };

    timeline.push(check_in);


    var test_procedure = {
      timeline: [fixation, sret_trial],
      timeline_variables: test_stimuli,
      randomize_order: true
    }

    timeline.push(test_procedure);

    // Task complete screen
    var task_complete = {
      type: "html-keyboard-response",
      stimulus: '<div class="sret-instructions">' +
        '<h2>Task Complete!</h2>' +
        '<p>Thank you for completing the Self-Referential Encoding Task.</p>' +
        '<p>Press SPACEBAR to finish.</p>' +
        '</div>',
      choices: [" "],
      on_finish: function() {
        // Save all SRET data to Qualtrics embedded data
        var all_trials = jsPsych.data.get().filter({task: 'sret'});
        var practice_trials = all_trials.filter({trialtype: 'practice'});
        var main_trials = all_trials.filter({trialtype: 'block'});
        
        // Extract data arrays
        var main_words = [];
        var main_valences = [];
        var main_responses = [];
        var main_endorsements = [];
        var main_rts = [];
        
        main_trials.values().forEach(function(trial) {
          main_words.push(trial.word);
          main_valences.push(trial.valence || 'neutral');
          main_responses.push(trial.response);
          main_endorsements.push(trial.endorse);
          main_rts.push(trial.rt);
        });
        
        // Practice data
        var practice_words = [];
        var practice_responses = [];
        var practice_endorsements = [];
        var practice_rts = [];
        
        practice_trials.values().forEach(function(trial) {
          practice_words.push(trial.word);
          practice_responses.push(trial.response);
          practice_endorsements.push(trial.endorse);
          practice_rts.push(trial.rt);
        });
        
        // Save to Qualtrics embedded data
        Qualtrics.SurveyEngine.setEmbeddedData("sret_participant_id", ppt);
        Qualtrics.SurveyEngine.setEmbeddedData("sret_main_words", main_words.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("sret_main_valences", main_valences.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("sret_main_responses", main_responses.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("sret_main_endorsements", main_endorsements.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("sret_main_response_times", main_rts.join(';'));
        
        Qualtrics.SurveyEngine.setEmbeddedData("sret_practice_words", practice_words.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("sret_practice_responses", practice_responses.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("sret_practice_endorsements", practice_endorsements.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("sret_practice_response_times", practice_rts.join(';'));
        
        // Calculate summary statistics
        var positive_endorsed = main_trials.filter({valence: 'positive', endorse: true}).count();
        var negative_endorsed = main_trials.filter({valence: 'negative', endorse: true}).count();
        var avg_rt = Math.round(main_trials.select('rt').mean());
        
        Qualtrics.SurveyEngine.setEmbeddedData("sret_positive_endorsed_count", positive_endorsed.toString());
        Qualtrics.SurveyEngine.setEmbeddedData("sret_negative_endorsed_count", negative_endorsed.toString());
        Qualtrics.SurveyEngine.setEmbeddedData("sret_average_response_time", avg_rt.toString());
        Qualtrics.SurveyEngine.setEmbeddedData("sret_total_trials_completed", main_trials.count().toString());

        console.log("SRET Data Export Summary:");
        console.log("Practice trials completed:", practice_trials.count());
        console.log("Main trials completed:", main_trials.count());
        console.log("Positive words endorsed:", positive_endorsed);
        console.log("Negative words endorsed:", negative_endorsed);
        console.log("Average response time:", avg_rt + "ms");

        // End the jsPsych experiment
        jsPsych.endExperiment();
        
        // Clear the stage
        jQuery('#display_stage').remove();
        jQuery('#display_stage_background').remove();

        // Simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
      }
    };

    timeline.push(task_complete);

    // Initialize jsPsych
    jsPsych.init({
      timeline: timeline,
      display_element: 'display_stage',
      on_finish: function() {
        console.log("SRET experiment completed");
      }
    });

  }

});

Qualtrics.SurveyEngine.addOnReady(function () {
  /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
  /*Place your JavaScript here to run when the page is unloaded*/

});