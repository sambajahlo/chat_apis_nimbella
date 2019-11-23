const nim = require('nim');

const main = (params) => {
  const messagePoolKey = 'chat_demo_message_pool';
  const redis = nim.redis()
  const message = params.message
  const username = params.username
  const timestamp = params.timestamp

  console.log(message, username, timestamp)
  console.log(JSON.stringify({ message, timestamp, username }))
  return redis.lremAsync('chat_demo_message_pool', 1, JSON.stringify({ message, timestamp, username })).then(res => {
    if (res === 0) {
      return { returnCode: -1, message: JSON.stringify({ message, timestamp, username }) }
    }
    return { returnCode: 0, timestamp: params.timestamp }
  });
};

exports.main = main;
