import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";
import Stripe from "stripe";
import { CourseProgress } from "../models/courseProgress.model.js";

//get user data
export const getUserData=async (req,res) => {
    try {
        const userId=req.auth.userId;
        // console.log(userId);
        const user = await User.findById(userId);
        if(!user){
            return res.json({success:false,message: 'User not found'});
        }
        res.json({success:true,user});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//user enrolled courses with lecture link
export const userEnrolledCourses=async (req,res) => {
    try {
        const userId=req.auth.userId;
        const userData = await User.findById(userId).populate('EnrolledCourses');
        res.json({success:true,enrolledCourses: userData.enrolledCourses});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//puchase course
export const purchaseCourse=async (req,res) => {
    try {
        const {courseId}=req.body;
        const {origin}=req.headers
        const userId=req.auth.userId;
        // console.log(userId);
        const userData=await User.findById(userId);
        const courseData=await Course.findById(courseId);
        if(!userData || !courseData){
            return res.json({success:false,message:'Data not found'});
        }
        const purchaseData={
            courseId:courseData._id,
            userId ,
            amount:(courseData.coursePrice-courseData.discount*courseData.coursePrice / 100).toFixed(2)
        }
        const newPurchase = await Purchase.create(purchaseData);

        //stripe gate way initialize
        const StripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency = process.env.CURRENCY.toLocaleLowerCase();

        //creating line items to for stripe
        const line_items=[{
            price_data:{
                currency,
                product_data:{
                    name:courseData.courseTitle
                },
                unit_amount:Math.floor(newPurchase.amount) * 100
            },
            quantity: 1
        }]

        const session = await StripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url:`${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata:{
                purchaseId: newPurchase._id.toString()
            }
        })

        res.json({success:true, session_url: session.url});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//update user course progress
export const updateUserCourseProgress = async (req,res) => {
    try {
        const userId=req.auth.userId
        const {courseId, lectureId} = req.body;
        const progressData = await CourseProgress.findOne({userId,courseId});
        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                return res.json({success:true, message: 'Lecture already completed'});
            }
            progressData.lectureCompleted.push(lectureId);
            await progressData.save();
        }
        else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })
            res.json({success:true,message:'Progress updated'});
        }
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//get user course progress
export const getUserCourseProgress = async (req,res) => {
    try {
        const userId=req.auth.userId
        const {courseId, lectureId} = req.body;
        const progressData = await CourseProgress.findOne({userId,courseId});
        res.json({success:true,progressData});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

// Add user ratings to course
export const addUserRating = async (req,res) => {
    const userId = req.auth.userId;
    const {courseId,rating} = req.body;
    // console.log(userId,courseId,rating);
    
    if(!userId || !courseId || !rating || rating<1 || rating>5){
        return res.json({success:false,message:'Invalid details'});
    }
    try {
        const course = await Course.findById(courseId);
        if(!course){
            return res.json({success:false,message:'Course not found'});
        }
        const user = await User.findById(userId);
        if(!user || !user.enrolledCourses.includes(courseId)){
            return res.json({success:false,message:'User is not enrolled'})
        }
        const existingRatingIndex = course.courseRatings.findIndex( r => r.userId === userId);
        if(existingRatingIndex > -1){
            course.courseRatings[existingRatingIndex].rating=rating;
        }
        else{
            course.courseRatings.push({userId,rating});
        }
        await course.save();
        res.json({success:true,message:'Rating added'});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}