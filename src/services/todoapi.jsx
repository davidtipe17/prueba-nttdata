const fetchUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchUsers;