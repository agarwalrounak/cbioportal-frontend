import { assert } from 'chai';

import {Mutation} from "shared/api/generated/CBioPortalAPI";
import {defaultOncoKbIndicatorFilter, generateQueryVariantId, groupOncoKbIndicatorDataByMutations} from './OncoKbUtils';
import {IndicatorQueryResp} from "../api/generated/OncoKbAPI";

describe('OncoKbUtils', () => {

    before(() => {

    });

    after(() => {

    });

    describe("generateQueryVariantId", () => {
        it('properly generates query variant id when both entrezGeneId and tumor type are valid', () => {
            assert.equal(generateQueryVariantId(451,'two'), '451_two');
        });

        it('properly generates query variant id when only entrezGeneId is valid', () => {
            assert.equal(generateQueryVariantId(451, null), '451');
        });
    });

    describe("groupOncoKbIndicatorDataByMutations", () => {
        const mutationsByPosition = {
            [666]: [
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_66",
                    "proteinChange": "D666V",
                    "mutationType": "Missense_Mutation",
                    "proteinPosStart": 666,
                    "proteinPosEnd": 666
                },
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_67",
                    "proteinChange": "D666Z",
                    "mutationType": "Missense_Mutation",
                    "proteinPosStart": 666,
                    "proteinPosEnd": 666
                }
            ] as Mutation[],
            [790]: [
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_0",
                    "proteinChange": "T790M",
                    "mutationType": "Missense_Mutation",
                    "proteinPosStart": 790,
                    "proteinPosEnd": 790
                },
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_1",
                    "proteinChange": "T790M",
                    "mutationType": "Missense_Mutation",
                    "proteinPosStart": 790,
                    "proteinPosEnd": 790
                }
            ] as Mutation[],
            [858]: [
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_2",
                    "proteinChange": "L858R",
                    "mutationType": "Missense_Mutation",
                    "proteinPosStart": 858,
                    "proteinPosEnd": 858
                },
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_3",
                    "proteinChange": "L858R",
                    "mutationType": "Missense_Mutation",
                    "proteinPosStart": 858,
                    "proteinPosEnd": 858
                },
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_4",
                    "proteinChange": "L858R",
                    "mutationType": "Missense_Mutation",
                    "proteinPosStart": 858,
                    "proteinPosEnd": 858
                },
                {
                    "gene": {
                        "entrezGeneId": 1956,
                    },
                    "uniqueSampleKey": "uniqueSampleKey_5",
                    "proteinChange": "L858L",
                    "mutationType": "Silent",
                    "proteinPosStart": 858,
                    "proteinPosEnd": 858
                }
            ] as Mutation[]
        };

        const oncoKbData  = {
            "uniqueSampleKeyToTumorType": {
                "uniqueSampleKey_0": "Lung Adenocarcinoma",
                "uniqueSampleKey_1": "Lung Adenocarcinoma",
                "uniqueSampleKey_2": "Lung Adenocarcinoma",
                "uniqueSampleKey_3": "Lung Adenocarcinoma",
                "uniqueSampleKey_4": "Lung Adenocarcinoma",
                "uniqueSampleKey_5": "Lung Adenocarcinoma",
                "uniqueSampleKey_66": "Lung Adenocarcinoma",
                "uniqueSampleKey_67": "Lung Adenocarcinoma"
            },
            "indicatorMap": {
                "1956_Lung_Adenocarcinoma_T790M_Missense_Mutation": {
                    "oncogenic": "Oncogenic",
                    "mutationEffect": {
                        "knownEffect": "Gain-of-function",
                    }
                } as IndicatorQueryResp,
                "1956_Lung_Adenocarcinoma_L858R_Missense_Mutation": {
                    "oncogenic": "Likely Oncogenic",
                    "mutationEffect": {
                        "knownEffect": "Gain-of-function",
                    }
                } as IndicatorQueryResp,
                "1956_Lung_Adenocarcinoma_D666V_Missense_Mutation": {
                    "oncogenic": "Inconclusive",
                    "mutationEffect": {
                        "knownEffect": "Unknown",
                    }
                } as IndicatorQueryResp,
                "1956_Lung_Adenocarcinoma_D666Z_Missense_Mutation": {
                    "oncogenic": "Unknown",
                    "mutationEffect": {
                        "knownEffect": "None",
                    }
                } as IndicatorQueryResp,
                "1956_Lung_Adenocarcinoma_L858L_Silent": {
                    "oncogenic": "NA",
                    "mutationEffect": {
                        "knownEffect": "NA",
                    }
                } as IndicatorQueryResp
            }
        };

        it ("groups OncoKB indicator data by mutation protein positions", () => {
            const grouped = groupOncoKbIndicatorDataByMutations(mutationsByPosition, oncoKbData, defaultOncoKbIndicatorFilter);

            assert.equal(grouped[790].length, 2,
                "all should be picked by the indicator filter as oncogenic at position 790");
            assert.equal(grouped[858].length, 3,
                "3 out of 4 should be picked by the indicator filter as oncogenic at position 858");
            assert.isUndefined(grouped[666],
                "none should be picked by the indicator filter as oncogenic at position 666");
        });
    });
});

