import axios from 'axios';

const CODECHEF_API =
  'https://www.codechef.com/api/list/contests/all';

async function main() {

  console.log(
    'Fetching CodeChef contests...'
  );

  const response =
    await axios.get(
      CODECHEF_API,
      {
        timeout: 10000,
        headers: {
          'User-Agent':
            'ContestAlarm/1.0',
          'Accept':
            'application/json',
        },
      }
    );

  console.log(
    'STATUS:',
    response.status
  );

  console.log(
    'CONTENT TYPE:',
    response.headers['content-type']
  );

  const data =
    response.data;

  console.log(
    '\nTOP LEVEL KEYS:'
  );

  console.log(
    Object.keys(data)
  );

  console.log(
    '\nFUTURE CONTEST COUNT:',
    data.future_contests?.length
  );

  console.log(
    '\n========== FUTURE CONTESTS ==========\n'
  );

  console.log(
    JSON.stringify(
      data.future_contests,
      null,
      2
    )
  );
}

main().catch((error: any) => {

  console.error(
    '\nERROR:'
  );

  console.error(
    error.response?.status ||
      error.message
  );

  if (error.response?.data) {
    console.error(
      error.response.data
    );
  }

  process.exit(1);
});