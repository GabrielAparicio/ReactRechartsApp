const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function generateNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
function generateInstalls() {
  return days.map((day) => ({ day, value: generateNumber(1, 100) }));
}

let id: number = 1;

export default function generateCampaign(name: string) {
  return {
    id: `new-id-${id++}`,
    name,
    installs: generateInstalls(),
  };
}
