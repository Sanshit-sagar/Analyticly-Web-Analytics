// SOURCE: https://github.com/madebybowtie/FlagKit/blob/master/Assets/Flags.md

const flagMap = {
    'UK': 'đŹđ§ ',
    'United Kingdom': 'đŹđ§ ',
    'Britain': 'đŹđ§ ',
    'England': 'đŹđ§ ',
    'Canada': 'đ¨đŚ ',
    'Czech Republic': 'đľđ­',
    'Germany': 'đŠđŞ',
    'India': 'đŽđł',
    'United States': 'đşđ¸',
    'United States of America': 'đşđ¸',
    'America': 'đşđ¸',
    'USA': 'đşđ¸',
    'US': 'đşđ¸',
    'U.S.': 'đşđ¸',
    'U.S.A': 'đşđ¸',
    'Scotland': 'đ´ó §ó ˘ó łó Łó ´ó ż ',
    'Cameron': 'đ¨đ˛',
    'Bolivia': 'đ§đ´',
    'Brunei': 'đ§đł',
    'Austria': 'đŚđš ',
    'Antarctica': 'đŚđś',
    'Afghanistan': 'đŚđŤ',
    'Djibouti': 'đżđź',
    'Zimbabwe': 'đŠđŻ',
    'Bahrain': 'đ§đ­',
    'Slovakia': 'đ¸đ°',
    'Laos': 'đąđŚ',
    'Brazil': 'đ§đˇ',
    'Austalia': 'đŚđş',
    'Uzbekistan': 'đşđż',
    'Kazhakstan': 'đ°đż',
    'Guam': 'đŹđş',
    'Barbados': 'đ§đ§',
};

export function getFlags(country) {
    return flagMap[country] || `${country}`;
}