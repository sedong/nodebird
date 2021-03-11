const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req,res,next) =>{
    try{
        const user = await User.findOne({where: {id:req.user.id}});
        if(user){
            await user.addFollowings([parseInt(req.params.id,10)]); //수정할려면 seFollowings, 재거할려면 removeFollowings, 내팔로원 가져올려면 getFollowings
            res.send('success');
        }else{
            res.status(404).send('no user');
        }
    }catch (error){
        console.error(error);
        next(error);
    }
});

module.exports = router;