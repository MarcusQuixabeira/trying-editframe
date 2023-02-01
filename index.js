const { Editframe } = require('@editframe/editframe-js')
const { parse } = require('subtitle')
const fs = require('fs')

require('dotenv').config()

async function main() {
  const editframe = new Editframe({
    develop: true,
    clientId: process.env.EDITFRAME_CLIENT_ID,
    token: process.env.EDITFRAME_TOKEN,
  })

  const composition = await editframe.videos.new({
    backgroundColor: '#000000',
    dimensions: {
      height: 1080,
      width: 1920,
    },
    duration: 15
  })

  const image1 = await composition.addImage(`${__dirname}/resources/images/perfil.png`, {
    position: {
        x: "center",
        y: "center",
      },
    size: {
      height: 400,
      width: 400,
    },
    trim: { end: 8 },
    transitions: [
      {
        options: {
          duration: 1,
        },
        type: 'fadeOut',
      },
    ],
  })

  const image2 = await composition.addImage(`${__dirname}/resources/images/editframe-logo.png`, {
    position: {
        x: "center",
        y: "center",
      },
    size: {
      height: 400,
      width: 400,
    },
    trim: { end: 7 },
    transitions: [
      {
        options: {
          duration: 1,
        },
        type: 'fadeIn',
      },
    ],
  })

  await composition.addAudio(`${__dirname}/resources/sounds/tristram.mp3`,
    {
      volume: 0.5
    },
    {
      transitions: [
        {
          options: {
            duration: 5,
          },
          type: 'fadeOut',
        },
      ],
    }
  )
  
  await composition.addSequence([image1, image2]);

  const inputStream = fs.createReadStream(`${__dirname}/resources/subtitles.srt`)
  inputStream
    .pipe(parse())
    .on('data', async (node) => {
      composition.addText(
        {
          text: node.data.text,
          fontSize: 70,
          color: "#ffffff",
          fontFamily: "Arial",
          padding: 50,
        },
        {
          position: {
            x: "center",
            y: "bottom",
          },
          timeline: {
            start: node.data.start / 1000,
          },
          trim: {
            end: node.data.end / 1000 - node.data.start / 1000,
          },
        }
      );
    })
    .on('error', console.error)
    .on('finish', async () => {
      const video = await composition.encodeSync()
      console.log(video)
    })
}

main()