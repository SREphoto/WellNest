import SwiftUI

struct WidgetView: View {
    let averageScore: Int
    
    var body: some View {
        VStack(spacing: 10) {
            Text("Your Circle's Vibe")
                .font(.headline)
                .foregroundColor(.white)

            ZStack {
                Circle()
                    .stroke(Color.gray.opacity(0.5), lineWidth: 10)

                Circle()
                    .trim(from: 0, to: CGFloat(averageScore) / 100)
                    .stroke(averageScore > 50 ? Color.blue : Color.red, style: StrokeStyle(lineWidth: 10, lineCap: .round))
                    .rotationEffect(.degrees(-90))

                Text("\(averageScore)%")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            .frame(width: 100, height: 100)
        }
        .padding()
        .background(Color.black.opacity(0.8))
    }
}

struct WidgetView_Previews: PreviewProvider {
    static var previews: some View {
        WidgetView(averageScore: 50)
    }
}
