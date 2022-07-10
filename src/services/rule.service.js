function RuleService() {
  var _self = this;

  _self.applyRule = function (
    ruleId,
    employeeShift,
    updateInfo,
    employeeSchedule
  ) {
    console.log(employeeSchedule.shifts);
    console.log(employeeShift);
    if (updateInfo.shiftCode !== "-") {
      let searchMore = true;
      const previous_key = moment(employeeShift.shiftDate);
      const next_key = moment(employeeShift.shiftDate);
      console.log('The previous_key :', previous_key.format('L'));
      console.log('The next_key :', next_key.format('L'));

      let previous_shift_ends = false;
      let next_shift_ends = false;
      let occurrence = 0;

      while (searchMore) {
        const previous = previous_key.subtract(1, 'days').format('L');
        const next = next_key.add(1, 'days').format('L');
        const previousShift = employeeSchedule.shifts.find(s => previous === s.shiftDate.format('L'));
        const nextShift = employeeSchedule.shifts.find(s => next === s.shiftDate.format('L'));
        console.log('the previous shift :', previous);
        console.log('the next shift :', next);

        if (previous_shift_ends || previousShift.shiftCode === '-'){
          previous_shift_ends = true;
        }
        else {
          occurrence++;
        }

        if (next_shift_ends || nextShift.shiftCode === '-'){
          next_shift_ends = true;
        }
        else {
          occurrence++;
        }

        if (occurrence >= 5 || (previous_shift_ends && next_shift_ends)){
          searchMore = false;
        }
      }

      console.log('The total :', occurrence);
      return occurrence < 5;
    }

    return true;
  };
}
