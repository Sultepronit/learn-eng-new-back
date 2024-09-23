const dbBlocks = {
    articles: {
        db: ['number', 'repeat_status', 'word', 'transcription', 'translation', 'example'],
        js: ['number', 'repeatStatus', 'word', 'transcription', 'translation', 'example'],
    },
    tap: {
        db: [
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
