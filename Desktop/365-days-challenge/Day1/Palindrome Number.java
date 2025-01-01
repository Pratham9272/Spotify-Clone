class Solution {
  public boolean isPalindrome(int x) {
      if(x<0){
          return false;
      }
      int n = x;
      int ReverseNumber = 0;
      while(n>0){
          int r = n%10;
          ReverseNumber = ReverseNumber*10 + r;
          n=n/10;
      }
      if(ReverseNumber == x){
          return true;
      }else{
          return false;
      }
  }
}