const dbBlocks = {
    articles: {
        db: ['number', 'word', 'transcription', 'translation', 'example'],
        get js() {
            return this.db;
        }
    },
    tap: {
        db: [
            'tap_status', 
            'tap_f_progress', 
            'tap_f_record', 
            'tap_f_autorepeat', 
            'tap_b_progress', 
            'tap_b_record', 
            'tap_b_autorepeat'
        ],
        js: [
            'tapStatus',
            'tapFProgress',
            'tapFRecord',
            'tapFAutorepeat',
            'tapBProgress',
            'tapBRecord',
            'tapBAutorepeat'
        ]
    },
    write: {
        db: [
            'write_status',
            'write_f_progress',
            'write_f_record',
            'write_f_autorepeat',
            'write_b_progress',
            'write_b_record',
            'write_b_autorepeat',
        ],
        js: [
            'writeStatus',
            'writeFProgress',
            'writeFRecord',
            'writeFAutorepeat',
            'writeBProgress',
            'writeBRecord',
            'writeBAutorepeat',
        ]
    }
};

export default dbBlocks;

// const dbBlocks = {
//     articles: [
//         ['word', 'word'],
//         ['transcription', 'transcription'],
//         ['translation', 'translation'],
//         ['example', 'example']
//     ],
//     tap: [
//         ['tap_status', 'tapStatus'],
//         ['tap_f_progress', 'tapFProgress'],
//         ['tap_f_record', 'tapFRecord'],
//         ['tap_f_autorepeat', 'tapFAutorepeat'],
//         ['tap_b_progress', 'tapBProgress'],
//         ['tap_b_record', 'tapBRecord'],
//         ['tap_b_autorepeat', 'tapBAutorepeat']
//     ],
//     write: [
//         ['write_status', 'writeStatus'],
//         ['write_f_progress', 'writeFProgress'],
//         ['write_f_record', 'writeFRecord'],
//         ['write_f_autorepeat', 'writeFAutorepeat'],
//         ['write_b_progress', 'writeBProgress'],
//         ['write_b_record', 'writeBRecord'],
//         ['write_b_autorepeat', 'writeBAutorepeat']
//     ]
// };
