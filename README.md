# SRET-in-Qualtrics

This repository contains the instructions and code for implementing a **Self-Referential Encoding Task (SRET)** designed to be embedded into Qualtrics surveys.

For any questions, please open new issues on this repository - and if you wish to contribute to the documentation or fix any errors, feel free to make a pull request.

Click [me](https://nus.syd1.qualtrics.com/jfe/form/SV_agC0U7DchyvX4Tc) to see an example!

## Task Overview

**Procedure:**

- Participants complete 57 word trials total (5 practice + 52 main task)
- Each trial shows a fixation cross (600-1000ms) followed by a single word
- Participants press **Q** if the word describes them, **P** if it does not
- Main task includes 26 positive words and 26 negative words
- Practice phase includes feedback on response speed

**Measures:**

- Self-endorsement patterns (which positive/negative words participants accept as self-descriptive)
- Response times for self-referential decisions
- Practice performance and speed feedback

## Embedding Instructions

The Self-Referential Encoding Task can be embedded into a Qualtrics survey following the steps below.

### Adding the Task as a Question

To begin, create a new block in your survey by clicking **"Add Block"**.

![alt text](assets/1.PNG)

After that, create a new question by clicking **"+ Add new question"**.

![alt text](assets/2.PNG)

Once you click on the **"+ Add new question"** button, a dropdown will appear. Select the **"Text / Graphic"** option.

![alt text](assets/3.PNG)

This will result in a template question, as shown below.

![alt text](assets/4.PNG)

From here, hover above the **"Click to write the question text"**, and click on it. This should show you several more options.

![alt text](assets/5.PNG)

From here, click on **"HTML View"** at the right corner. The following popup will appear.

![alt text](assets/6.PNG)

Copy-and-paste the code in `code/index.html` into this box, and then click **"Save"**.

![alt text](assets/7.PNG)

Once you have done so, the question should now look like this.

![alt text](assets/8.PNG)

### Adding the SRET Task Code

Now, go to the left navigation bar. You should see several options like below (if you do not see them, try clicking on the question once more). Here, click on **"JavaScript"**.

![alt text](assets/9.PNG)

The following popup will appear.

![alt text](assets/10.PNG)

Delete all the code in here, copy-and-paste the code in `original.js` into this box, and then click **"Save"**.

![alt text](assets/11.PNG)

The code has been embedded successfully!

### Adding the Embedded Data

Now, the last thing to tackle is the data recording process. Go to the left navigation bar once more, and this time click on the second icon. This will take you to the **"Survey flow"** page.

![alt text](assets/12.PNG)

The **"Survey flow"** page should look something like this. This is an example taken from a pre-existing survey; the question names were crossed out for privacy purposes.

![alt text](assets/13.PNG)

Here, there should be a block for your SRET Task. On the block containing your SRET Task, click on **"Add Below"**.

![alt text](assets/14.PNG)

This will popup.

![alt text](assets/15.PNG)

Here, click on **"Embedded Data"**.

![alt text](assets/16.PNG)

This will be the result of clicking on **"Embedded Data"**.

![alt text](assets/17.PNG)

Here, what you need to do is to create 12 separate data entries named:

- `sret_participant_id`
- `sret_main_words`
- `sret_main_valences`
- `sret_main_responses`
- `sret_main_endorsements`
- `sret_main_response_times`
- `sret_practice_words`
- `sret_practice_responses`
- `sret_practice_endorsements`
- `sret_practice_response_times`
- `sret_positive_endorsed_count`
- `sret_negative_endorsed_count`
- `sret_average_response_time`
- `sret_total_trials_completed`

When you do this, Qualtrics will automatically log these data, and it will be accessible through its `.csv` data file export. After you have included all data fields, it should look similar to this:

![alt text](assets/18.PNG)

Remember to click on **"Apply"** at the bottom of the page.

And you're all set! Head back to the survey tab, and publish the survey.

![alt text](assets/20.PNG)

## Data Output

The experiment collects the following data:

**Participant Data:**

- `sret_participant_id`: Participant identifier (from Qualtrics or auto-generated)

**Practice Phase Data:**

- `sret_practice_words`: Words shown during practice (semicolon separated)
- `sret_practice_responses`: Key responses ('q' or 'p', semicolon separated)
- `sret_practice_endorsements`: Whether word was endorsed (true/false, semicolon separated)
- `sret_practice_response_times`: Response times in milliseconds (semicolon separated)

**Main Task Data:**

- `sret_main_words`: All 52 words shown (semicolon separated)
- `sret_main_valences`: Word valences ('positive' or 'negative', semicolon separated)
- `sret_main_responses`: Key responses ('q' or 'p', semicolon separated)
- `sret_main_endorsements`: Whether word was endorsed (true/false, semicolon separated)
- `sret_main_response_times`: Response times in milliseconds (semicolon separated)

**Summary Statistics:**

- `sret_positive_endorsed_count`: Number of positive words endorsed (0-26)
- `sret_negative_endorsed_count`: Number of negative words endorsed (0-26)
- `sret_average_response_time`: Average response time in milliseconds
- `sret_total_trials_completed`: Total number of main trials completed

**Response Key Mapping:**

- `q`: Word **does** describe me (endorsement = true)
- `p`: Word **does not** describe me (endorsement = false)

## Advanced Instructions

The code for the Self-Referential Encoding Task is contained inside `original.js` file.

**Customizing Word Lists:**

To modify word lists, locate the `practice_stimuli` (line 286) and `test_stimuli` (line 295). Each word follows this format:

**Practice words:**

```js
{ stimulus: 'young', trialtype: 'practice'}
```

**Main task words:**

```js
{ stimulus: 'happy', valence: 'positive', trialtype: 'block'}
```

- `stimulus`: The word presented to participants
- `valence`: Word valence ('positive' or 'negative')
- `trialtype`: Trial type ('practice' or 'block')

**Customizing Timing:**

- Fixation cross duration: Randomly selected from `[600, 700, 800, 900, 1000]` ms (line 356)
- Word display: No time limit by default (participants respond at their own pace)
- Speed feedback thresholds: <300ms (too fast) and >2000ms (too slow) in practice phase

**Customizing Response Keys:**

- Current mapping: Q = "describes me", P = "does not describe me"
- To change keys: modify the `choices: ['q', 'p']` parameter in the `sret_trial` object (around line 373)
