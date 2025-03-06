
import { capitalizeFirst, separateHyphens, getEnglishFlavorText } from '../utils.js'
import { describe, test, expect } from 'vitest'


describe('Testing helper functions in utils', () => {
    describe("Capitalize First", () => {
      test("Capitalize First single word", () => {
        const cap_string_potion = capitalizeFirst("potion")

        expect(cap_string_potion).toEqual("Potion")
      })

      test("Capitalize First no word", () => {
        const cap_string_blank = capitalizeFirst("")
        expect(cap_string_blank).toEqual("")
      })

      test("Capitalize First double word", () => {
        const cap_string_ultra = capitalizeFirst("ultra ball")
        expect(cap_string_ultra).toEqual("Ultra ball")
      })
    })


    describe("Separate Hyphens", () => {
      test("No hypens", () => {
        const hyphen_potion = separateHyphens("potion")
        expect(hyphen_potion).toEqual("Potion")
      })

      test("Includes one hyphen", () => {
        const hyphen_ultra = separateHyphens("ultra-ball")
        expect(hyphen_ultra).toEqual("Ultra Ball")
      })

      test("No text", () => {
        const hypen_blank = capitalizeFirst("")
        expect(hypen_blank).toEqual("")
      })

      test("Multiple hyphens", () => {
        const hyphen_ultra_ultra = separateHyphens("ultra-ultra-ball")
        expect(hyphen_ultra_ultra).toEqual("Ultra Ultra-ball")
      })
    })


    describe("Get English Flavor Text", () => {
      test("Get English Flavor Text when english exists", () => {
        const rotoEncounter_flav_entries = [
        {
            "language": {
                "name": "ja-Hrkt",
                "url": "https://pokeapi.co/api/v2/language/1/"
            },
            "text": "ロトムパワーの　ひとつ。\nいっていじかん　レベルの　たかい\nやせいポケモンと　であいやすくなる。",
            "version_group": {
                "name": "ultra-sun-ultra-moon",
                "url": "https://pokeapi.co/api/v2/version-group/18/"
            }
        },
        {
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "text": "One of the Rotom Powers.\nIt increases the chance of encountering high-level\nwild Pokémon a lot for a certain period of time.",
            "version_group": {
                "name": "ultra-sun-ultra-moon",
                "url": "https://pokeapi.co/api/v2/version-group/18/"
            }
        }
        ]
        const en_rotoEncounter_flav = getEnglishFlavorText(rotoEncounter_flav_entries)

        expect(en_rotoEncounter_flav).toEqual("One of the Rotom Powers.\nIt increases the chance of encountering high-level\nwild Pokémon a lot for a certain period of time.")
      })

      test("Get English Flavor Text where there is no english flav text", () => {
        const rotoEncounter_flav_entries = [
        {
            "language": {
                "name": "ja-Hrkt",
                "url": "https://pokeapi.co/api/v2/language/1/"
            },
            "text": "ロトムパワーの　ひとつ。\nいっていじかん　レベルの　たかい\nやせいポケモンと　であいやすくなる。",
            "version_group": {
                "name": "ultra-sun-ultra-moon",
                "url": "https://pokeapi.co/api/v2/version-group/18/"
            }
        }
        ]
        const en_rotoEncounter_flav = getEnglishFlavorText(rotoEncounter_flav_entries)

        expect(en_rotoEncounter_flav).toEqual("No english flavor text")
      })
    })

  })