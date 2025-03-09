import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tags = [
  'ONE_PIECE',
  'ATTACK_ON_TITAN',
  'JUJUTSU_KAISEN',
  'DEMON_SLAYER',
  'MY_HERO_ACADEMIA',
  'CHAINSAW_MAN',
  'BLEACH_THOUSAND_YEAR_BLOOD_WAR',
  'TOKYO_REVENGERS',
  'SPY_X_FAMILY',
  'BLUE_LOCK',
  'VINLAND_SAGA',
  'MASHLE',
  'SOLO_LEVELING',
  'OUSAMA_RANKING',
  'BOCCHI_THE_ROCK',
  'HUNTER_X_HUNTER',
  'NARUTO',
  'BORUTO',
  'RE_ZERO',
  'JOBLESS_REINCARNATION',
  'THE_RISING_OF_THE_SHIELD_HERO',
  'OVERLORD',
  'BLACK_CLOVER',
  'DR_STONE',
  'RECORD_OF_RAGNAROK',
  'THE_DANGERS_IN_MY_HEART',
  'LYCORECO',
  'THE_ELFEN_LIED',
  'DRAGON_BALL',
  'OTHERS',
];

async function main() {
  // Inserindo as tags no banco de dados
  for (const tag of tags) {
    await prisma.chatTag.create({
      data: {
        name: tag,
      },
    });
  }
}

main()
  .then(() => console.log('Seed criada com sucesso!'))
  .catch((e) => {
    throw e;
  })
  .finally(() => {
    prisma.$disconnect();
  });
