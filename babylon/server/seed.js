const db = require('./models')


let composerArray = [
  {
      name: "Bach",
      description: "Johann Sebastian Bach (1685-1750) was a German composer in the early Baroque period who was known for his innovation in counterpoint and harmonic organization. He was one of the first composers to embed intellectual motifs into his pieces and is remembered today for both the beauty and technical depth of his pieces.",
      timeperiod: "Baroque",
      meshName: "T8"
  },

  {
      name: "Handel",
      description: "George Frideric Handel (1685-1759) was </br> a German, and later British, baroque era composer who made great strides in the realm of opera and choral works. He is remembered not only for his musical creations but also as a dramatic genius. Over his lifespan, he composed more than forty operas, of which Messiah remains a frequently performed staple across the world.",
      timeperiod: "Baroque",
      meshName: "T9"
  },
  {
      name: "Telemann",
      description: "Georg Philipp Telemann (1681-1767) was a German Baroque composer and one of the most prolific composers in history, considered by his contemporaries as a leading composer. His style is seen as a link between the Baroque and later Classical period and contains French and Italian themes.",
      timeperiod: "Baroque",
      meshName: "T10"
  },
  {
      name: "Pachelbel",
      description: "Johann Pachelbel (1653-1706) was a German middle-baroque era composer whose work consisted mostly of sacred and secular music. He is widely remembered for his famous Canon in D, which is still performed prolifically at various venues across cultures. His composition style consists of a more straight-forward style that emphasizes harmonic and melodic clarity.",
      timeperiod: "Baroque",
      meshName: "T6"
  },
  {
      name: "Vivaldi",
      description: "Antonio Vivaldi (1678-1741) was an Italian Baroque composer. His influence was extremely widespread across Europe during his lifetime. His work primarily consisted of instrumental concertos for stringed instruments but also forty operas. His musical style is noted for its innovative melodies and harmonic contrasts, and portrays an exuberant mood.",
      timeperiod: "Baroque",
      meshName: "T7"
  },
  {
      name: "Haydn",
      description: "Johann Sebastian Bach (1685-1750) was a German composer in the early Baroque period who was known for his innovation in counterpoint and harmonic organization. He was one of the first composers to embed intellectual motifs into his pieces and is remembered today for both the beauty and technical depth of his pieces.",
      timeperiod: "Classical",
      meshName: "T11"
  },
  {
      name: "Salieri",
      description: "Antonio Salieri (1750-1825) was an Italian Classical era composer. He was a pivotal figure in the development of opera and throughout his life, was a sought-after teacher. His list of pupils include Liszt, Schubert, and Beethoven. ",
      timeperiod: "Classical",
      meshName: "T12"
  },
  {
      name: "Hummel",
      description: "Johann Nepomuk Hummel (1778-1837) was an Austrian composer of the late Classical period and much of his music reflects the transition to the Romantic. His talent was recognized by Mozart, who served as his teacher free-of-charge for over two years. His style is seen as clean and disciplined as opposed to the more ornate style that was rising in popularity during his lifetime. ",
      timeperiod: "Classical",
      meshName: "T13"
  },
  {
      name: "Tchaikovsky",
      description: "Pyotr Ilyich Tchaikovsky (1840-1893) was a Russian late-Romantic composer whose works are among the most popular music in today’s classical repertoire. As the first Russian to gain international recognition, his works displayed a large range of depth, grandeur, and exoticism.",
      timeperiod: "Romantic",
      meshName: "T27"
  },
  {
      name: "Mozart",
      description: "Wolfgang Amadeus Mozart (1756-1791) was an Austrian composer of the Classical era who is still one of the most famous musicians of all time. Although he only lived to be 35, his prolific compositions beginning from his early childhood continue to define the repertoire of classical musicians today. Many other composers regard him as the best of all time and Haydn once said that posterity will not see such a talent for centuries. ",
      timeperiod: "Classical",
      meshName: "T28"
  },
  {
      name: "Beethoven",
      description: "Ludwig van Beethoven (1770-1827) was a German composer who was crucial to the transition between the Classical and Romantic periods. Known as the “greatest living composer” during his lifetime, he remains one of the most influential figures in musical history. Although deaf in the last decades of his life, he produced his most admired works in that period. His style is defined as heroic and triumphant, expanding on the formal structural themes shown by his predecessors while contributing his own touch that eventually influenced a swath of Romantic era composers. ",
      timeperiod: "Romantic",
      meshName: "T33"
  },
  {
      name: "Brahms",
      description: "Johannes Brahms (1833-1897) was a German composer of the Romantic era who is considered by history as both a traditionalist and innovator. His music has deep roots in the techniques of Classical masters, and has very meticulous yet romantic nature. His music is seen as very complex and absolute, as he saw music as a pure form of art and not as a portrayal of other things. ",
      timeperiod: "Romantic",
      meshName: "T30"
  },
  {
      name: "Chopin",
      description: "Frédéric François Chopin (1810-1849) was a Polish composer of the Romantic era who is primarily known for his work for the solo piano. Known as a “poetic genius without equal”, Chopin’s music is known for its technical demand and emotional nuances. Citing Bach and Mozart as his two important influences, he adds a level of sophisticated passion to his compositions. ",
      timeperiod: "Romantic",
      meshName: "T31"
  },
  {
      name: "Dvorak",
      description: "Antonín Leopold Dvořák (1841-1904) was a Czech composer of the late Romantic period. His style heavily incorporates “the fullest recreation of a national idiom” and range from operas to nine full-fledged symphonies. He generally stuck to the classical model, incorporating Czech folk music themes into his melodies and rhythms.",
      timeperiod: "Romantic",
      meshName: "T32"
  },
  {
      name: "Liszt",
      description: "Franz Liszt (1811-1886) was a Hungarian composer of the Romantic era who was known as a prodigious pianist during his lifetime. As one of the most prominent members of the New German School, he was known for his invention of the symphonic poem and radical departures from traditional harmony.  His style is seen as liberal and evocative, defying that of many of his contemporaries.",
      timeperiod: "Romantic",
      meshName: "T34"
  },
  {
      name: "Schubert",
      description: "Franz Schubert (1797-1828) was an Austrian composer of the Romantic period who was extremely prolific although he only lived to be 32. Championed by Brahms and Liszt among other greats, he was one of the most performed composers of the nineteenth century. His works are defined by pleasant melodies and an easy-going charm. ",
      timeperiod: "Romantic",
      meshName: "T35"
  },
  {
      name: "Prokofiev",
      description: "Sergei Prokofiev (1891-1953) was a Russian post-Romantic composer who is acknowledged as a creator of masterpieces across numerous genres. Known for his ferociously dissonant music for the piano, he also created beautifully melodic symphonies for orchestras. ",
      timeperiod: "Post-Romantic",
      meshName: "T36"
  },
  {
      name: "Vaughan Williams",
      description: "Ralph Vaughan Williams (1872-1958) was one of the best known English composers. His orchestral compositions include nine symphonies and marked a traditional break from British music. Much of his music tells stories about different experiences in his life and portrays scenes throughout history. ",
      timeperiod: "Post-Romantic",
      meshName: "T37"
  },
  {
      name: "Stravinsky",
      description: "Igor Stravinsky (1882-1971) was a Russian composer and one of the most influential of the 20th century. His career is notable for its stylistic diversity and rhythmic energy. Later in his life, he was known as one of music’s primary innovators and is one of the most prolifically performed among modern orchestras around the world. ",
      timeperiod: "Post-Romantic",
      meshName: "T38"
  },
  {
      name: "Sousa",
      description: "John Philip Sousa (1854-1932) was an American composer and conductor of the late Romantic era who is known for his military and patriotic marches. Known as the “March King”, his works are performed on American holidays. ",
      timeperiod: "Post-Romantic",
      meshName: "T39"
  },
  {
      name: "Ives",
      description: "Charles Ives (1874-1954) was one of the only Americans to gain international recognition and a post-Romantic and modernist composer. Known as an American Original, he was largely ignored during his lifetime. His music is experimental, and focuses on traditional and patriotic hymns. ",
      timeperiod: "Post-Romantic",
      meshName: "T40"
  },
  {
      name: "Shostakovich",
      description: "Dmitri Shostakovich (1906-1975) was a prominent Russian composer of the twentieth century. His music is defined by sharp contrasts and ambivalent tonality. His large symphonies remain entrenched as part of traditionally performed classical repertoire. ",
      timeperiod: "Post-Romantic",
      meshName: "T41"
  },
  {
      name: "Saint-Saens",
      description: "Camille Saint-Saëns (1835-1921) was a French composer of the late Romantic era. First discovered as a musical prodigy, he influenced many of the twentieth century composers to come. As a youth, he was regarded as a modernist but his music always kept the great classical minds such as Mozart as the foundation of his works. His exotic instrumentation and deft harmonisation recharacterized the way orchestras grouped musicians.",
      timeperiod: "Post-Romantic",
      meshName: "T42"
  }
]

const composerPromiseArray = [];

const seedComposers = composers => composers.forEach(composer=>{
  composerPromiseArray.push(db.model('composer').create(composer))
})

db.sync({force:true})
.then(()=>{
  return Promise.all(seedComposers(composerArray))
})
.catch(error => console.error.bind(console))
