export const getStaffRole = () => {
  let staffString = localStorage.getItem('staff');

  try {
    let staff = JSON.parse(staffString);
    return staff.staff.role;
  } catch (error) {
    console.log(error);
  }

  return '';
};
