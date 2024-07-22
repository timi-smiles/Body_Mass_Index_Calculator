'use strict';

const radioBtns = document.querySelectorAll('.bmi__radiobtn');
const imperialPairs = document.querySelectorAll('.bmi__details-imperialPairs');
const metricParticulars = document.querySelectorAll(
  '.bmi__details-parameter-box'
);

const height = document.querySelector('.parameter__height');
const weight = document.querySelector('.parameter__weight');

const heightFt = document.querySelector('.parameter-imperial-ft');
const heightIn = document.querySelector('.parameter-imperial-in');

const weightSt = document.querySelector('.parameter-imperial-st');
const weightLbs = document.querySelector('.parameter-imperial-lbs');

const welcome = document.querySelector('.bmi__welcome');
const bmiResult = document.querySelector('.bmi__result');
const resultVal = document.querySelector('.bmi__result-value');
const resultClass = document.querySelector('.bmi__result-class');
const resultRange = document.querySelector('.bmi__result-range');

const parameter = document.querySelector('.parameter');
const parameterImperial = document.querySelector('.parameter-imperial');

const metricSystem = function () {
  metricParticulars.forEach(
    metricParticular => (metricParticular.style.display = 'flex')
  );

  imperialPairs.forEach(imperialpair => imperialpair.classList.add('hide'));

  heightFt.value = 0;
  heightIn.value = 0;
  weightSt.value = 0;
  weightLbs.value = 0;
};

const imperialSystem = function () {
  metricParticulars.forEach(
    metricParticular => (metricParticular.style.display = 'none')
  );

  height.value = 0;
  weight.value = 0;

  imperialPairs.forEach(imperialpair => imperialpair.classList.remove('hide'));
};

const bmi = function (height, weight) {
  return weight / (height * height);
};

const classifyBmi = function (bmiVal) {
  if (bmiVal < 18.5) {
    return 'Underweight';
  } else if (bmiVal < 24.9) {
    return 'Healthy weight';
  } else if (bmiVal < 29.9) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
};

const idealBodyWeightMetric = function () {
  // const ht = height.value / (0.0254 * 100);          //height in INCHES
  // return 47.75 + 2.3 * (ht - 60);

  const ht = height.value / 100;

  return [18.5 * ht * ht, 24.9 * ht * ht];
};

const idealBodyWeightImperial = function () {
  // const feetIntiInch = heightFt.value * 12;
  // const ht = feetIntiInch + Number(heightIn.value); //height in INCHES
  // return 47.75 + 2.3 * (ht - 60);

  const ht = heightFt.value * 0.3048 + heightIn.value * 0.0254;
  return [18.5 * ht * ht, 24.9 * ht * ht];
};

const showResult = function () {
  welcome.style.display = 'none';
  bmiResult.classList.remove('hide');
};

const showwelcome = function () {
  welcome.style.display = 'flex';
  bmiResult.classList.add('hide');
};

const init = function () {
  radioBtns.forEach(radiobtn =>
    radiobtn.addEventListener('click', function (e) {
      showwelcome();
      const selectedbtn = e.target.id;

      if (selectedbtn === 'imperial') {
        imperialSystem();
      } else {
        metricSystem();
      }
    })
  );
};

function calcMetricBmi() {
  const ht = height.value / 100; //height in meters
  const wt = weight.value;

  if (!isNaN(ht) && !isNaN(wt) && ht > 0 && wt > 0) {
    const bmiVal = bmi(ht, wt);

    showResult(bmiVal);
    resultVal.textContent = `${bmiVal.toFixed(1)}`;

    const bmiClassify = classifyBmi(bmiVal);
    resultClass.textContent = `${bmiClassify}`;

    const [ibwMin, ibwMax] = idealBodyWeightMetric(ht, wt);
    resultRange.textContent = `${ibwMin.toFixed(1)}kg-${ibwMax.toFixed(1)}kg`;
  } else {
    showwelcome();
  }
}

function calcImperialBmi() {
  const ht = heightFt.value * 0.3048 + heightIn.value * 0.0254; //height in meters
  const wt = weightSt.value * 6.35029 + weightLbs.value * 0.453592; //weight in kgs
  if (!isNaN(ht) && !isNaN(wt) && ht > 0 && wt > 0) {
    const bmiVal = bmi(ht, wt);
    showResult(bmiVal);
    resultVal.textContent = `${bmiVal.toFixed(1)}`;
    const bmiClassify = classifyBmi(bmiVal);
    resultClass.textContent = `${bmiClassify}`;
    const [ibwMin, ibwMax] = idealBodyWeightImperial(ht, wt);
    resultRange.textContent = `${ibwMin.toFixed(1)}kg-${ibwMax.toFixed(1)}kg`;
  } else {
    showwelcome();
  }
}
height.addEventListener('input', calcMetricBmi);
weight.addEventListener('input', calcMetricBmi);

heightFt.addEventListener('input', calcImperialBmi);
heightIn.addEventListener('input', calcImperialBmi);
weightSt.addEventListener('input', calcImperialBmi);
weightLbs.addEventListener('input', calcImperialBmi);

init();
