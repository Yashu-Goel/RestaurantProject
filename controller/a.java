import java.util.*;
public class a{
    public static void main(String[] args) {
        String ques="abc";

        
        combString(ques);

        //-------------------------------------------
        // ArrayList<String> list=new ArrayList<>();
        
        // permutation(ques,ans,list);
        // System.out.println(list);
        // swap( list);   
    }

    public static void combString(String s) {
        // Print initial string, as only the alterations will be printed later
        ArrayList<String> ans=new ArrayList<>();
        ans.add(s);        
        System.out.println(s);   
        char[] a = s.toCharArray();
        int n = a.length;
        int[] p = new int[n];  // Weight index control array initially all zeros. Of course, same size of the char array.
        int i = 1; //Upper bound index. i.e: if string is "abc" then index i could be at "c"
        while (i < n) {
            if (p[i] < i) { //if the weight index is bigger or the same it means that we have already switched between these i,j (one iteration before).
                int j = ((i % 2) == 0) ? 0 : p[i];//Lower bound index. i.e: if string is "abc" then j index will always be 0.
                swap(a, i, j);
                // Print current
                String ansstr=join(a);
                ans.add(ansstr);
                System.out.println(ansstr);

                p[i]++; //Adding 1 to the specific weight that relates to the char array.
                i = 1; //if i was 2 (for example), after the swap we now need to swap for i=1
            }
            else { 
                p[i] = 0;//Weight index will be zero because one iteration before, it was 1 (for example) to indicate that char array a[i] swapped.
                i++;//i index will have the option to go forward in the char array for "longer swaps"
            }
        }

        // String temp=ans.get()
        System.out.println(ans);

    }
    
    private static String join(char[] a) {
        StringBuilder builder = new StringBuilder();
        builder.append(a);
        return builder.toString();
    }
    
    private static void swap(char[] a, int i, int j) {
        char temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }







//     public static void swap(ArrayList<String> list){

//         int i=0,j=list.size()/2;
//         ArrayList<String> ans=new ArrayList<>();

//         while(j<list.size()){
//             ans.add(list.get(i));
//             ans.add(list.get(j));
//             i++;j++;
//         }
       

//         System.out.println(ans);

//     }

//     public static void permutation(String ques,String ans,ArrayList<String> list){
//         if(ques.length()==0){
//             list.add(ans);
//             return;
//         }
//         char ch=ques.charAt(0);
//         String roq=ques.substring(1);
//         for(int i=ans.length();i>=0;i--){
//             String nans=ans.substring(0,i)+ch+ans.substring(i);
//             permutation(roq,nans,list);
//         }

//     }


//     public static void permutation1(String ques,String ans,int a){
//         if(ques.length()==0){
//             System.out.println(ans);
//             return;
//         }

//         for(int i=ques.length()-1;i>=0;i--){
//             char ch=ques.charAt(i);
//             String nques=ques.substring(0,i)+ques.substring(i+1);
//             permutation1(nques,ans+ch,a+1);
//         }
    
//     }

}