const defaultShiftCode = "-";

function RuleService() {
  var _self = this;

  _self.applyRule = function (
    ruleId,
    employeeShift,
    updateInfo,
    employeeSchedule
  ) {
    if (updateInfo.shiftCode !== defaultShiftCode) {
      if (ruleId === Rules.notMoreThanFiveWorkDaysInARow) {
        return _rule101(employeeShift, employeeSchedule);
      }
    }
    return true;
  };

  function _rule101(employeeShift, employeeSchedule) {
    let searchMore = true;
    const fwd_key = moment(employeeShift.shiftDate);
    const bw_key = moment(employeeShift.shiftDate);
    console.log("The forward key :", fwd_key.format("L"));
    console.log("The backword key :", bw_key.format("L"));

    let fwd_check_ended = false;
    let bw_check_ends = false;
    let shift_count = 0;

    while (searchMore) {
      const fwd_date = fwd_key.subtract(1, "days").format("L");
      const bw_date = bw_key.add(1, "days").format("L");

      const fwd_shift = findShift(fwd_date, employeeSchedule);
      const bw_shift = findShift(bw_date, employeeSchedule);

      if (!fwd_check_ended) {
        fwd_check_ended = check_off_work(fwd_shift);
        shift_count += count_work_day(fwd_shift);
      }

      if (!bw_check_ends) {
        bw_check_ends = check_off_work(bw_shift);
        shift_count += count_work_day(bw_shift);
      }

      if (fwd_check_ended && bw_check_ends) {
        searchMore = false;
      }

      if (shift_count >= 5) {
        searchMore = false;
      }
    }

    console.log("The total :", shift_count);
    return shift_count < 5;
  }

  function count_work_day(shift) {
      return shift.shiftCode === defaultShiftCode ? 0 : 1;
  }

  function check_off_work(shift) {
    return shift.shiftCode === defaultShiftCode;
  }

  function findShift(key, employeeSchedule) {    
    const shift = employeeSchedule.shifts.find(
      (s) => key === s.shiftDate.format("L")
    );
    console.log("Found the shift:", shift);
    return shift;
  }
}
