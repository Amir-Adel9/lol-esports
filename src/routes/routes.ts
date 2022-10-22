import express from 'express';
import lck from './leagues/lck';
import lcs from './leagues/lcs';
import lec from './leagues/lec';
import lpl from './leagues/lpl';
import worlds from './leagues/worlds';

const router = express.Router();

router.get('/', (req, res) => res.send('Main api route'));

router.use('/worlds', worlds);
router.use('/lec', lec);
router.use('/lcs', lcs);
router.use('/lpl', lpl);
router.use('/lck', lck);

export default router;
