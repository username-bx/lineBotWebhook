const express = require('express');
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser');

// LINE bot SDK 配置
const config = {
//   channelSecret: '你的 Channel Secret',
  channelSecret: 'd7122f354e557a831f66d7a4dacfccc3',
//   channelAccessToken: '你的 Channel Access Token',
  channelAccessToken: 'pQgHrocH94+oTxHxpn2w8/IjSOYZSA2L0TWPXzS00bXj4frjoN/sFxid65DDuyv0ssYwmck7yvY0OjAEcf39uOqyOA+wEZ65s8NZsDtMreO6gkK271q2FYA6X12wNq+k8AcuM5yOdYiC2raptJoUZwdB04t89/1O/w1cDnyilFU=',
};

// 创建 Express 应用
const app = express();

// 使用 body-parser 中间件处理请求体
app.use(bodyParser.json());

// 创建 LINE 客户端
const client = new line.Client(config);

// 处理 POST 请求
app.post('/webhook', (req, res) => {
  // 获取事件
  const events = req.body.events;

  // 处理事件
  Promise.all(events.map(handleEvent))
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 处理事件的函数
function handleEvent(event) {
  // 仅处理文本消息
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // 获取用户发送的消息
  const userMessage = event.message.text;

  // 创建要发送的回复消息
  const reply = {
    type: 'text',
    text: `现在只能重复你发送的消息是：${userMessage}`,
  };

  // 发送回复
  return client.replyMessage(event.replyToken, reply);
}

// 启动服务器
app.listen(3000, () => {
  console.log('Line bot server running on port 3000');
});
