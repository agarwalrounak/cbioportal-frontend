import * as React from "react";
import {observer} from "mobx-react";
import {computed} from "mobx";
import MutationTable from "shared/components/mutationTable/MutationTable";
import {IMutationTableProps} from "shared/components/mutationTable/MutationTable";
import LazyLoadedTableCell from "shared/lib/LazyLoadedTableCell";
import {MutationTableColumnType} from "shared/components/mutationTable/MutationTable";
import CancerTypeCache from "../../../shared/cache/CancerTypeCache";
import MutationCountCache from "../../../shared/cache/MutationCountCache";
import {Mutation, ClinicalData, MutationCount} from "../../../shared/api/generated/CBioPortalAPI";
import {Column} from "../../../shared/components/lazyMobXTable/LazyMobXTable";

export interface IResultsViewMutationTableProps extends IMutationTableProps {
    // TODO add results view specific props
}

@observer
export default class ResultsViewMutationTable extends MutationTable<IResultsViewMutationTableProps> {

    constructor(props:IResultsViewMutationTableProps) {
        super(props);
    }

    public static defaultProps =
    {
        ...MutationTable.defaultProps,
        columns: [
            MutationTableColumnType.SAMPLE_ID,
            MutationTableColumnType.COPY_NUM,
            MutationTableColumnType.ANNOTATION,
            MutationTableColumnType.REF_READS_N,
            MutationTableColumnType.VAR_READS_N,
            MutationTableColumnType.REF_READS,
            MutationTableColumnType.VAR_READS,
            MutationTableColumnType.START_POS,
            MutationTableColumnType.END_POS,
            MutationTableColumnType.REF_ALLELE,
            MutationTableColumnType.VAR_ALLELE,
            MutationTableColumnType.MUTATION_STATUS,
            MutationTableColumnType.VALIDATION_STATUS,
            MutationTableColumnType.CENTER,
            MutationTableColumnType.CHROMOSOME,
            MutationTableColumnType.PROTEIN_CHANGE,
            MutationTableColumnType.MUTATION_TYPE,
            MutationTableColumnType.MUTATION_ASSESSOR,
            MutationTableColumnType.COSMIC,
            MutationTableColumnType.TUMOR_ALLELE_FREQ,
            MutationTableColumnType.NORMAL_ALLELE_FREQ,
            MutationTableColumnType.CANCER_TYPE,
            MutationTableColumnType.NUM_MUTATIONS
        ]
    };

    protected generateColumns() {
        super.generateColumns();

        // override default visibility for some columns
        this._columns[MutationTableColumnType.MUTATION_ASSESSOR].visible = true;


        // order columns
        this._columns[MutationTableColumnType.SAMPLE_ID].order = 10;
        this._columns[MutationTableColumnType.CANCER_TYPE].order = 15;
        this._columns[MutationTableColumnType.PROTEIN_CHANGE].order = 20;
        this._columns[MutationTableColumnType.ANNOTATION].order = 30;
        this._columns[MutationTableColumnType.MUTATION_TYPE].order = 40;
        this._columns[MutationTableColumnType.COPY_NUM].order = 50;
        this._columns[MutationTableColumnType.COSMIC].order = 60;
        this._columns[MutationTableColumnType.MUTATION_STATUS].order = 70;
        this._columns[MutationTableColumnType.VALIDATION_STATUS].order = 80;
        this._columns[MutationTableColumnType.MUTATION_ASSESSOR].order = 90;
        this._columns[MutationTableColumnType.CENTER].order = 100;
        this._columns[MutationTableColumnType.CHROMOSOME].order = 110;
        this._columns[MutationTableColumnType.START_POS].order = 120;
        this._columns[MutationTableColumnType.END_POS].order = 130;
        this._columns[MutationTableColumnType.REF_ALLELE].order = 140;
        this._columns[MutationTableColumnType.VAR_ALLELE].order = 150;
        this._columns[MutationTableColumnType.TUMOR_ALLELE_FREQ].order = 160;
        this._columns[MutationTableColumnType.NORMAL_ALLELE_FREQ].order = 170;
        this._columns[MutationTableColumnType.VAR_READS].order = 180;
        this._columns[MutationTableColumnType.REF_READS].order = 190;
        this._columns[MutationTableColumnType.VAR_READS_N].order = 200;
        this._columns[MutationTableColumnType.REF_READS_N].order = 210;
        this._columns[MutationTableColumnType.NUM_MUTATIONS].order = 220;

        // exclude
        this._columns[MutationTableColumnType.CANCER_TYPE].shouldExclude = ()=>{
            return !this.props.cancerTypeCache;
        };
        this._columns[MutationTableColumnType.NUM_MUTATIONS].shouldExclude = ()=>{
            return !this.props.mutationCountCache;
        };
    }
}